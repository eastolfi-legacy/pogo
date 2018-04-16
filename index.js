/**
https://pokemongo.gamepress.gg/damage-mechanics
https://pokemongo.gamepress.gg/cp-multiplier
https://gist.github.com/anonymous/077d6dea82d58b8febde54ae9729b1bf
https://www.reddit.com/r/pokemongodev/comments/4t59t1/decoded_game_master_protobuf_file_v01_all_pokemon/
https://www.reddit.com/r/TheSilphRoad/comments/4t7r4d/exact_pokemon_cp_formula/

**/

const AvatarCustomization = require("./pokemongo-json-pokedex/output/avatar-customization.json");
const Moves = require("./pokemongo-json-pokedex/output/move.json");
const Pokemons = require("./pokemongo-json-pokedex/output/pokemon.json");
const Types = require("./pokemongo-json-pokedex/output/type.json");
const Mine = require("./mine.json");

function uniques(/*Array*/array) {
    return [...new Set(array)];
}

function getDamage(/*Object*/ info) {
	let { power, attack, defense, types } = info;
	let stab = TypeHelper.getSTAB(types.pokemonTypes, types.moveType);
	let wab = 1.0;
	let effective = TypeHelper.getEffectivenessAgainst(types.moveType, types.type1, types.type2);
	
	return Math.floor(
		0.5 * power * (attack / defense) * stab * wab * effective
	) + 1;
}

function round(number, precision) {
	var shift = function (number, precision, reverseShift) {
		if (reverseShift) {
			precision = -precision;
		}  
		numArray = ("" + number).split("e");
		return +(numArray[0] + "e" + (numArray[1] ? (+numArray[1] + precision) : precision));
	};
	return shift(Math.round(shift(number, precision, false)), precision, true);
}
	
class PokemonHelper {
	static findByName(/*String*/ name) {
		return Pokemons.find(pkmn => name.toLowerCase().trim() === pkmn.name.toLowerCase().trim());
	}
	
	static getBestAttacks(/*String*/pokemonName) {
		let pokemon = PokemonHelper.findByName(pokemonName);
		
		let bestQuickMove = 
			pokemon.quickMoves
			.map(quickMove => {
				let move = MoveHelper.findByName(quickMove.name);
				
				return { name: move.name, score: MoveHelper.getMoveDPS_DPE(move.name) };
			})
			.sort((itemA, itemB) => itemA.score < itemB.score)[0];
		
		let bestChargedMove = 
			pokemon.cinematicMoves
			.map(quickMove => {
				let move = MoveHelper.findByName(quickMove.name);
				
				return { name: move.name, score: MoveHelper.getMoveDPS_DPE(move.name) };
			})
			.sort((itemA, itemB) => itemA.score < itemB.score)[0];
			
		return { quick: bestQuickMove, charged: bestChargedMove };
	}
	
	static getAllInfo(/*String*/pokemonName) {
		let pokemon = PokemonHelper.findByName(pokemonName);
		
		console.log(`\nInformation for #${pokemon.dex} ${pokemon.name}\n`);
		console.log(`Max CP: ${pokemon.maxCP}`);
		console.log(`Types: ${pokemon.types[0].name}${pokemon.types[1] ? " - " + pokemon.types[1].name : ""}`);
		console.log(`Stats: ${pokemon.stats.baseAttack} Attack | ${pokemon.stats.baseDefense} Defense | ${pokemon.stats.baseStamina} Stamina`);
		console.log(`Quick Moves:`);
		pokemon.quickMoves.forEach(m => {
			let move = MoveHelper.findByName(m.name);
			console.log(`\t${move.name} (${move.pokemonType.name}) => Power: ${move.power} | DPS: ${MoveHelper.getMoveDPS(move.name)} | DPE: ${MoveHelper.getMoveDPE(move.name)} | Score: ${MoveHelper.getMoveDPS_DPE(move.name)}`)
		});
		console.log(`Charged Moves:`);
		pokemon.cinematicMoves.forEach(m => {
			let move = MoveHelper.findByName(m.name);
			console.log(`\t${move.name} (${move.pokemonType.name}) => Power: ${move.power} | DPS: ${MoveHelper.getMoveDPS(move.name)} | DPE: ${MoveHelper.getMoveDPE(move.name)} | Score: ${MoveHelper.getMoveDPS_DPE(move.name)}`)
		});
		
		let bestAttacks = PokemonHelper.getBestAttacks(pokemonName);
		console.log(`Best Quick Attack is "${bestAttacks.quick.name}" (${bestAttacks.quick.score} score)`);
		console.log(`Best Charged Attack is "${bestAttacks.charged.name}" (${bestAttacks.charged.score} score)`);
	}
	
	static findStrongestTypesAgainstType(/*IType*/typeAgainst) {
		if (!typeAgainst) return [];
		
		let types = [];
		let typeName = typeAgainst.name;
		
		Types.forEach(type => {
			let strongAgainst = type.damage
				.filter(damageAgainstType => damageAgainstType.id === typeAgainst.id && (damageAgainstType.attackScalar || 0) > 1);
			
			if (strongAgainst && strongAgainst.length) {
				types.push(type.name);
			}
		});

		return uniques(types);
	}

	static getTypesStrongestAgainst(/*String*/ pokemonName) {
		let pokemon = PokemonHelper.findByName(pokemonName);
		
		let type1 = TypeHelper.findByName(pokemon.types[0].name);
		let type2 = TypeHelper.findByName(pokemon.types[1].name);
		
		let strongAgainstType1 = PokemonHelper.findStrongestTypesAgainstType(type1);
		let strongAgainstType2 = PokemonHelper.findStrongestTypesAgainstType(type2);
		
		let strongestTypes = uniques([...strongAgainstType1, ...strongAgainstType2])
			.map(type => TypeHelper.findByName(type));
		
		console.log(`Strongest types against ${pokemon.name}: `);
    
		for (let type of strongAgainstType1) {
			console.log(`${type} is strong against ${type1.name}`);
			
			if (strongAgainstType2.indexOf(type) !== -1) {
				console.log(`\tand against ${type2.name}!`);
			}
		}
		
		for (let type of strongAgainstType2) {
			if (strongAgainstType2.indexOf(type) === -1) {
				console.log(`${type} is strong against ${type2.name}`);
			}
		}

		return strongestTypes;
	}
	
	static getScoreForPokemonAgainst(/*String*/ pokemonName, /*String*/ pokemonAgainst) {
		let pokemon = PokemonHelper.findByName(pokemonName);
		let against = PokemonHelper.findByName(pokemonAgainst);
		
		let lastBestQuickMove = null;
		pokemon.quickMoves.forEach(quickMove => {
			let damageQuick = PokemonHelper.getDamageAgainst(pokemonName, quickMove.name, pokemonAgainst);
			
			console.log(`${pokemonName} will do ${damageQuick} damage to ${pokemonAgainst} with ${quickMove.name}`);
			
			if (!lastBestQuickMove || lastBestQuickMove.damage < damageQuick) {
				lastBestQuickMove = { name: quickMove.name, damage: damageQuick };
			}
		});
		
		let lastBestChargedMove = null;
		pokemon.cinematicMoves.forEach(chargedMove => {
			let damageCharged = PokemonHelper.getDamageAgainst(pokemonName, chargedMove.name, pokemonAgainst);
			
			console.log(`${pokemonName} will do ${damageCharged} damage to ${pokemonAgainst} with ${chargedMove.name}`);
			
			if (!lastBestChargedMove || lastBestChargedMove.damage < damageCharged) {
				lastBestChargedMove = { name: chargedMove.name, damage: damageCharged };
			}
		});
		
		console.log(`The best configuration for ${pokemonName} against ${pokemonAgainst} is:`);
		console.log(`\tQuick Attack: ${lastBestQuickMove.name} with ${lastBestQuickMove.damage} damage (${MoveHelper.getDPS_DPE(lastBestQuickMove.name, lastBestQuickMove.damage)} DPS)`);
		console.log(`\tCharged Attack: ${lastBestChargedMove.name} with ${lastBestChargedMove.damage} damage (${MoveHelper.getDPS_DPE(lastBestChargedMove.name, lastBestChargedMove.damage)} DPS)`);
		
		// console.log(`Types of ${pokemon.name}:`);
		// console.log(pokemon.types);
		
		// console.log(`Fast attacks of ${pokemon.name}:`);
		// console.log(pokemon.quickMoves);
		
		// console.log(`Charged attacks of ${pokemon.name}:`);
		// console.log(pokemon.cinematicMoves);
		
		// console.log(`Types of ${against.name}:`);
		// console.log(against.types);
	}
	
	static getScoreForMinePokemonAgainst(/*String*/ pokemonName, /*Number*/pokemonIV, /*String*/ pokemonAgainst) {
		let pokemon = PokemonHelper.findByName(pokemonName);
		let myPokemon = MyPokemonHelper.findByNameAndIV(pokemonName, pokemonIV);
		let against = PokemonHelper.findByName(pokemonAgainst);
		
		let damageQuick = PokemonHelper.getDamageAgainst(pokemonName, myPokemon.attackFast, pokemonAgainst);
		// console.log(`Your ${pokemonName} will do ${damageQuick} damage to ${pokemonAgainst} with ${myPokemon.attackFast}`);
		let damageCharged = PokemonHelper.getDamageAgainst(pokemonName, myPokemon.attackCharged, pokemonAgainst);
		// console.log(`Your ${pokemonName} will do ${damageCharged} damage to ${pokemonAgainst} with ${myPokemon.attackCharged}`);
		
		let scoreQuick = MoveHelper.getDPS_DPE(myPokemon.attackFast, damageQuick);
		let scoreCharged = MoveHelper.getDPS_DPE(myPokemon.attackCharged, damageCharged);
		
		
		
		
		
		
		return scoreQuick + scoreCharged;
	}
	
	static getDamageAgainst(/*String*/ pokemonUser, /*String*/ moveName, /*String*/ pokemonName) {
		let move = MoveHelper.findByName(moveName);
		let pokemon = PokemonHelper.findByName(pokemonUser);
		let myPokemon = MyPokemonHelper.findByName(pokemonUser);
		let pokemonAgainst = PokemonHelper.findByName(pokemonName);
		
		let damage = getDamage({
			power: move.power,
			attack: getAttack(pokemon, { attack: 15, defense: 15, stamina: 15 }),
			defense: getDefense(pokemon, { attack: 15, defense: 15, stamina: 15 }),
			types: {
				pokemonTypes: pokemon.types,
				moveType: move.pokemonType.name,
				type1: pokemonAgainst.types[0].name,
				type2: pokemonAgainst.types[1] ? pokemonAgainst.types[1].name : null
			}
		});
		
		// console.log(pokemon);
		// console.log(move);
		// console.log(pokemonAgainst.types);
		// console.log(damage);
		
		return round(damage, 4);
	}
}

function getAttack(pokemon, pokemonIVs) {
	return (pokemon.stats.baseAttack + pokemonIVs.attack) * 0.79030001;// assuming a lvl 40 pokemon
}
function getDefense(pokemon, pokemonIVs) {
	return (pokemon.stats.baseDefense + pokemonIVs.defense) * 0.79030001;// assuming a lvl 40 pokemon
}

class TypeHelper {
	static findByName(/*String*/ name) {
		if (!name || !name.trim()) return null;

		return Types.find(type => name.toLowerCase().trim() === type.name.toLowerCase().trim());
	}
	
	static getSTAB(/*String[]*/pokemonTypes, /*String*/moveType) {
		if (pokemonTypes.map(type => type.name).indexOf(moveType) !== -1) {
			return 1.2;
		} else {
			return 1.0;
		}
	}
	
	static getEffectivenessAgainst(/*String*/type, /*String*/typeAgainst1, /*String*/typeAgainst2) {
		let type1 = TypeHelper.findByName(typeAgainst1);
		let type2 = TypeHelper.findByName(typeAgainst2);
		
		let effectivenessAgainstType1 = 
			TypeHelper.findByName(type)
				.damage.find(d => d.id === type1.id)
				.attackScalar;
		let effectivenessAgainstType2 = (typeAgainst2 && typeAgainst2.trim().length) ?
			TypeHelper.findByName(type)
				.damage.find(d => d.id === type2.id)
				.attackScalar
			: 1.0;

		// return effectivenessAgainstType1 * effectivenessAgainstType2;
		// return Math.trunc(effectivenessAgainstType1 * effectivenessAgainstType2 * 10000) / 10000;
		return Math.round(effectivenessAgainstType1 * effectivenessAgainstType2 * 1000) / 1000;
	}
}

class MoveHelper {
	static findByName(/*String*/ name) {
		if (!name || !name.trim()) return null;

		return Moves.find(type => name.toLowerCase().trim() === type.name.toLowerCase().trim());
	}
	
	static getMoveDPS(/*String*/moveName) {
		let move = MoveHelper.findByName(moveName);
		
		return round(move.power / move.durationMs * 1000, 4);
	}
	
	static getMoveDPE(/*String*/moveName) {
		let move = MoveHelper.findByName(moveName);
		
		return round(move.power / Math.abs(move.energyDelta), 4);
	}
	
	static getMoveDPS_DPE(/*String*/moveName, /*Number*/damage) {
		return round(MoveHelper.getMoveDPS(moveName) * MoveHelper.getMoveDPE(moveName), 4);
	}
	
	static getDPS(/*String*/moveName, /*Number*/damage) {
		let move = MoveHelper.findByName(moveName);
		
		return round(damage / move.durationMs * 1000, 4);
	}
	
	static getDPE(/*String*/moveName, /*Number*/damage) {
		let move = MoveHelper.findByName(moveName);
		
		return round(damage / Math.abs(move.energyDelta), 4);
	}
	
	static getDPS_DPE(/*String*/moveName, /*Number*/damage) {
		return round(MoveHelper.getDPS(moveName, damage) * MoveHelper.getDPE(moveName, damage), 4);
	}
}

class MyPokemonHelper {
	static findByName(/*String*/ name) {
		if (!name || !name.trim()) return null;

		return Mine.find(pokemon => name.toLowerCase().trim() === pokemon.name.toLowerCase().trim());
	}
	
	static findByNameAndIV(/*String*/ name, /*Number*/iv) {
		if (!name || !name.trim()) return null;

		return Mine.find(pokemon => name.toLowerCase().trim() === pokemon.name.toLowerCase().trim() && pokemon.iv === iv);
	}
	
	static getBestTeamAgainst(/*String*/ name) {
		let pokemonScores = Mine.map(myPokemon => {
			return {
				name: myPokemon.name,
				iv: myPokemon.iv,
				score: PokemonHelper.getScoreForMinePokemonAgainst(myPokemon.name, myPokemon.iv, name)
			}
		});
		
		let team = pokemonScores.sort((itemA, itemB) => itemA.score > itemB.score ? -1 : itemA.score < itemB.score ? 1 : 0).slice(0, 6);
		
		console.log(`Best team against ${name}:`);
		team.forEach(member => {
			let pokemon = MyPokemonHelper.findByNameAndIV(member.name, member.iv);
			console.log(`${pokemon.name} ${pokemon.iv}% with ${pokemon.attackFast} and ${pokemon.attackCharged} => Score: ${member.score}`);
		});
	}
}

// MyPokemonHelper.getBestTeamAgainst("Latias");

PokemonHelper.getScoreForPokemonAgainst("Latias", "Scizor");

// let result = PokemonHelper.getTypesStrongestAgainst("Moltres");

// PokemonHelper.getScoreForMinePokemonAgainst("Golem", "Moltres");

// PokemonHelper.getDamageAgainst("Golem", "Rock Throw Fast", "Moltres");
// PokemonHelper.getDamageAgainst("Golem", "Mud Slap Fast", "Moltres");
// PokemonHelper.getDamageAgainst("Golem", "Mud Slap Fast", "Jynx");
// PokemonHelper.getDamageAgainst("Golem", "Mud Shot Fast", "Moltres");
// PokemonHelper.getDamageAgainst("Golem", "Mud Shot Fast", "Jynx");

// console.log(MoveHelper.findByName("Rock Throw Fast"));

// console.log(TypeHelper.getEffectivenessAgainst("Rock", "Fire", "Fighting"));
// console.log(TypeHelper.getEffectivenessAgainst("Rock", "Fire", "Flying"));
// console.log(TypeHelper.getEffectivenessAgainst("Psychic", "Dark", "Psychic"));

// PokemonHelper.getAllInfo("Snorlax");


// console.log(result);