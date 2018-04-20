import find from "array.prototype.find";
import * as Symbol from "es6-symbol";
// import * as Types from "pokemongo-json-pokedex/output/type.json";

import { IType } from "./type.interfaces";

const token = Symbol("type-helper");
let instance: TypeHelper = null;

export class TypeHelper {
    allTypes: IType[] = [];

    constructor(pToken: Symbol) {
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }

        // this.allTypes = <IType[]>Types;
    }

    public hasData(): boolean {
        return this.allTypes && this.allTypes.length !== 0;
    }

    public setData(data: any[]): void {
        this.allTypes = data;
    }

	findByName(name: string): any {
		if (!name || !name.trim()) return null;

        return find(this.allTypes, type => name.toLowerCase().trim() === type.name.toLowerCase().trim());
		// return this.allTypes.find(type => name.toLowerCase().trim() === type.name.toLowerCase().trim());
	}

	getSTAB(pokemonTypes: any[], moveType: string): number {
		if (pokemonTypes.map(type => type.name).indexOf(moveType) !== -1) {
			return 1.2;
		} else {
			return 1.0;
		}
	}

    getWAB(): number {
        return 1.0;
    }

	getEffectivenessAgainst(type: string, typeAgainst1: string, typeAgainst2: string): number {
		let type1 = this.findByName(typeAgainst1);
		let type2 = this.findByName(typeAgainst2);

		let effectivenessAgainstType1 =
			this.findByName(type)
				.damage.find(d => d.id === type1.id)
				.attackScalar;
		let effectivenessAgainstType2 = (typeAgainst2 && typeAgainst2.trim().length) ?
			this.findByName(type)
				.damage.find(d => d.id === type2.id)
				.attackScalar
			: 1.0;

		// return effectivenessAgainstType1 * effectivenessAgainstType2;
		// return Math.trunc(effectivenessAgainstType1 * effectivenessAgainstType2 * 10000) / 10000;
		return Math.round(effectivenessAgainstType1 * effectivenessAgainstType2 * 1000) / 1000;
	}

    static getInstance(): TypeHelper {
        if (instance === null) {
            instance = new TypeHelper(token);
        }

        return instance;
    }
}
