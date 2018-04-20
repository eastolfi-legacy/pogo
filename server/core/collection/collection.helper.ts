import * as Symbol from "es6-symbol";
import find from "array.prototype.find";

import { PokemonHelper } from "../index";

import { ICollectionItem } from "./collection.interfaces";

const token = Symbol("collection-helper");
let instance: CollectionHelper = null;

export class CollectionHelper {
    myCollection: ICollectionItem[] = [];

    constructor(pToken: Symbol) {
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }
    }

    setCollection(items: ICollectionItem[]) {
        this.myCollection = items;
    }

	findByName(name: string) {
		if (!name || !name.trim()) return null;

		return find(this.myCollection, pokemon => name.toLowerCase().trim() === pokemon.name.toLowerCase().trim());
	}

	findByNameAndIV(name: string, iv: number) {
		if (!name || !name.trim()) return null;

		return find(this.myCollection, pokemon => name.toLowerCase().trim() === pokemon.name.toLowerCase().trim() && pokemon.iv === iv);
	}

	getBestTeamAgainst(name: string) {
		let pokemonScores = this.myCollection.map(myPokemon => {
			return {
				name: myPokemon.name,
				iv: myPokemon.iv,
				score: PokemonHelper.getInstance().getScoreForMinePokemonAgainst(myPokemon.name, myPokemon.iv, name)
			}
		});

		let team = pokemonScores.sort((itemA, itemB) => itemA.score > itemB.score ? -1 : itemA.score < itemB.score ? 1 : 0).slice(0, 6);

		console.log(`Best team against ${name}:`);
		team.forEach(member => {
			let pokemon = this.findByNameAndIV(member.name, member.iv);
			console.log(`${pokemon.name} ${pokemon.iv}% with ${pokemon.attackFast} and ${pokemon.attackCharged} => Score: ${member.score}`);
		});
	}

    static getInstance(): CollectionHelper {
        if (instance === null) {
            instance = new CollectionHelper(token);
        }

        return instance;
    }
}
