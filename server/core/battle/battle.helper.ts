import * as Symbol from "es6-symbol";
import { TypeHelper } from "../index";

const token = Symbol("battle-helper");
let instance: BattleHelper = null;

export class BattleHelper {
    constructor(pToken: Symbol) {
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }
    }

    getDamage(info: any): number {
    	let { power, attack, defense, types } = info;
        let typeHelper = TypeHelper.getInstance();

    	let stab = typeHelper.getSTAB(types.pokemonTypes, types.moveType);
    	let wab = typeHelper.getWAB();
    	let effective = typeHelper.getEffectivenessAgainst(types.moveType, types.type1, types.type2);

    	return Math.floor(
    		0.5 * power * (attack / defense) * stab * wab * effective
    	) + 1;
    }

    getAttack(pokemon: any, pokemonIVs: any): number {
    	return (pokemon.stats.baseAttack + pokemonIVs.attack) * 0.79030001;// assuming a lvl 40 pokemon
    }

    getDefense(pokemon: any, pokemonIVs: any): number {
    	return (pokemon.stats.baseDefense + pokemonIVs.defense) * 0.79030001;// assuming a lvl 40 pokemon
    }

    static getInstance(): BattleHelper {
        if (instance === null) {
            instance = new BattleHelper(token);
        }

        return instance;
    }
}
