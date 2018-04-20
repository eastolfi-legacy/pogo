import * as Symbol from "es6-symbol";
import find from "array.prototype.find";
// import * as Pokemons from "pokemongo-json-pokedex/output/pokemon.json";

import {
    BattleHelper, CollectionHelper, MoveHelper,
    TypeHelper, Utils
} from "../index";
import { IPokemon } from "./pokemon.interfaces";
// import { BattleHelper } from "./battle.helper";
// import { CollectionHelper } from "./collection.helper";
// import { MoveHelper } from "./move.helper";
// import { TypeHelper } from "./type.helper";
// import { Utils } from "../utils";

const token = Symbol("pokemon-helper");
let instance: PokemonHelper = null;

export class PokemonHelper {
    allPokemon: IPokemon[] = [];

    constructor(pToken: Symbol) {
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }

        // this.allPokemon = <IPokemon[]>Pokemons;
    }

    public hasData(): boolean {
        return this.allPokemon && this.allPokemon.length !== 0;
    }

    public setData(data: any[]): void {
        this.allPokemon = data;
    }

	findByName(name: string) {
		return find(this.allPokemon, pkmn => name.toLowerCase().trim() === pkmn.name.toLowerCase().trim());
	}

	getBestAttacks(pokemonName: string) {
		let pokemon = this.findByName(pokemonName);

		let bestQuickMove =
			pokemon.quickMoves
			.map(quickMove => {
				let move = MoveHelper.getInstance().findByName(quickMove.name);

				return { name: move.name, score: MoveHelper.getInstance().getMoveDPS_DPE(move.name) };
			})
			.sort((itemA, itemB) => itemA.score < itemB.score)[0];

		let bestChargedMove =
			pokemon.cinematicMoves
			.map(quickMove => {
				let move = MoveHelper.getInstance().findByName(quickMove.name);

				return { name: move.name, score: MoveHelper.getInstance().getMoveDPS_DPE(move.name) };
			})
			.sort((itemA, itemB) => itemA.score < itemB.score)[0];

		return { quick: bestQuickMove, charged: bestChargedMove };
	}

	getAllInfo(pokemonName: string) {
		let pokemon = this.findByName(pokemonName);

		console.log(`\nInformation for #${pokemon.dex} ${pokemon.name}\n`);
		console.log(`Max CP: ${pokemon.maxCP}`);
		console.log(`Types: ${pokemon.types[0].name}${pokemon.types[1] ? " - " + pokemon.types[1].name : ""}`);
		console.log(`Stats: ${pokemon.stats.baseAttack} Attack | ${pokemon.stats.baseDefense} Defense | ${pokemon.stats.baseStamina} Stamina`);
		console.log(`Quick Moves:`);
		pokemon.quickMoves.forEach(m => {
			let move = MoveHelper.getInstance().findByName(m.name);
			console.log(`\t${move.name} (${move.pokemonType.name}) => Power: ${move.power} | DPS: ${MoveHelper.getInstance().getMoveDPS(move.name)} | DPE: ${MoveHelper.getInstance().getMoveDPE(move.name)} | Score: ${MoveHelper.getInstance().getMoveDPS_DPE(move.name)}`)
		});
		console.log(`Charged Moves:`);
		pokemon.cinematicMoves.forEach(m => {
			let move = MoveHelper.getInstance().findByName(m.name);
			console.log(`\t${move.name} (${move.pokemonType.name}) => Power: ${move.power} | DPS: ${MoveHelper.getInstance().getMoveDPS(move.name)} | DPE: ${MoveHelper.getInstance().getMoveDPE(move.name)} | Score: ${MoveHelper.getInstance().getMoveDPS_DPE(move.name)}`)
		});

		let bestAttacks = this.getBestAttacks(pokemonName);
		console.log(`Best Quick Attack is "${bestAttacks.quick.name}" (${bestAttacks.quick.score} score)`);
		console.log(`Best Charged Attack is "${bestAttacks.charged.name}" (${bestAttacks.charged.score} score)`);
	}

	findStrongestTypesAgainstType(typeAgainst: any) {
		if (!typeAgainst) return [];

		let types = [];
		let typeName = typeAgainst.name;

		TypeHelper.getInstance().allTypes.forEach(type => {
			let strongAgainst = type.damage
				.filter(damageAgainstType => damageAgainstType.id === typeAgainst.id && (damageAgainstType.attackScalar || 0) > 1);

			if (strongAgainst && strongAgainst.length) {
				types.push(type.name);
			}
		});

		return Utils.uniques(types);
	}

	getTypesStrongestAgainst(pokemonName: string) {
		let pokemon = this.findByName(pokemonName);

		let type1 = TypeHelper.getInstance().findByName(pokemon.types[0].name);
		let type2 = TypeHelper.getInstance().findByName(pokemon.types[1].name);

		let strongAgainstType1 = this.findStrongestTypesAgainstType(type1);
		let strongAgainstType2 = this.findStrongestTypesAgainstType(type2);

		let strongestTypes = Utils.uniques([...strongAgainstType1, ...strongAgainstType2])
			.map(type => TypeHelper.getInstance().findByName(type));

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

	getScoreForPokemonAgainst(pokemonName: string, pokemonAgainst: string) {
		let pokemon = this.findByName(pokemonName);
		let against = this.findByName(pokemonAgainst);

		let lastBestQuickMove = null;
		pokemon.quickMoves.forEach(quickMove => {
			let damageQuick = this.getDamageAgainst(pokemonName, quickMove.name, pokemonAgainst);

			console.log(`${pokemonName} will do ${damageQuick} damage to ${pokemonAgainst} with ${quickMove.name}`);

			if (!lastBestQuickMove || lastBestQuickMove.damage < damageQuick) {
				lastBestQuickMove = { name: quickMove.name, damage: damageQuick };
			}
		});

		let lastBestChargedMove = null;
		pokemon.cinematicMoves.forEach(chargedMove => {
			let damageCharged = this.getDamageAgainst(pokemonName, chargedMove.name, pokemonAgainst);

			console.log(`${pokemonName} will do ${damageCharged} damage to ${pokemonAgainst} with ${chargedMove.name}`);

			if (!lastBestChargedMove || lastBestChargedMove.damage < damageCharged) {
				lastBestChargedMove = { name: chargedMove.name, damage: damageCharged };
			}
		});

		console.log(`The best configuration for ${pokemonName} against ${pokemonAgainst} is:`);
		console.log(`\tQuick Attack: ${lastBestQuickMove.name} with ${lastBestQuickMove.damage} damage (${MoveHelper.getInstance().getDPS_DPE(lastBestQuickMove.name, lastBestQuickMove.damage)} DPS)`);
		console.log(`\tCharged Attack: ${lastBestChargedMove.name} with ${lastBestChargedMove.damage} damage (${MoveHelper.getInstance().getDPS_DPE(lastBestChargedMove.name, lastBestChargedMove.damage)} DPS)`);

		// console.log(`Types of ${pokemon.name}:`);
		// console.log(pokemon.types);

		// console.log(`Fast attacks of ${pokemon.name}:`);
		// console.log(pokemon.quickMoves);

		// console.log(`Charged attacks of ${pokemon.name}:`);
		// console.log(pokemon.cinematicMoves);

		// console.log(`Types of ${against.name}:`);
		// console.log(against.types);
	}

	getScoreForMinePokemonAgainst(pokemonName: string, pokemonIV: number, pokemonAgainst: string) {
		let pokemon = this.findByName(pokemonName);
		let myPokemon = CollectionHelper.getInstance().findByNameAndIV(pokemonName, pokemonIV);
		let against = this.findByName(pokemonAgainst);

		let damageQuick = this.getDamageAgainst(pokemonName, myPokemon.attackFast, pokemonAgainst);
		// console.log(`Your ${pokemonName} will do ${damageQuick} damage to ${pokemonAgainst} with ${myPokemon.attackFast}`);
		let damageCharged = this.getDamageAgainst(pokemonName, myPokemon.attackCharged, pokemonAgainst);
		// console.log(`Your ${pokemonName} will do ${damageCharged} damage to ${pokemonAgainst} with ${myPokemon.attackCharged}`);

		let scoreQuick = MoveHelper.getInstance().getDPS_DPE(myPokemon.attackFast, damageQuick);
		let scoreCharged = MoveHelper.getInstance().getDPS_DPE(myPokemon.attackCharged, damageCharged);






		return scoreQuick + scoreCharged;
	}

	getDamageAgainst(pokemonUser: string, moveName: string, pokemonName: string) {
		let move = MoveHelper.getInstance().findByName(moveName);
		let pokemon = this.findByName(pokemonUser);
		let myPokemon = CollectionHelper.getInstance().findByName(pokemonUser);
		let pokemonAgainst = this.findByName(pokemonName);

		let damage = BattleHelper.getInstance().getDamage({
			power: move.power,
			attack: BattleHelper.getInstance().getAttack(pokemon, { attack: 15, defense: 15, stamina: 15 }),
			defense: BattleHelper.getInstance().getDefense(pokemon, { attack: 15, defense: 15, stamina: 15 }),
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

		return Utils.round(damage, 4);
	}

    static getInstance(): PokemonHelper {
        if (instance === null) {
            instance = new PokemonHelper(token);
        }

        return instance;
    }
}
