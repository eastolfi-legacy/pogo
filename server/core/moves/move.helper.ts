import * as Symbol from "es6-symbol";
import find from "array.prototype.find";
// import * as Moves from "pokemongo-json-pokedex/output/move.json";

import { Utils } from "../index";
import { IMove } from "./move.interfaces";

const token = Symbol("move-helper");
let instance: MoveHelper = null;


export class MoveHelper {
    allMoves: IMove[] = [];

    constructor(pToken: Symbol) {
        if (pToken !== token) {
            throw new Error("New instance not allowed. Please, use it as a singleton");
        }

        // this.allMoves = <IMove[]>Moves;
    }

    public hasData(): boolean {
        return this.allMoves && this.allMoves.length !== 0;
    }

    public setData(data: any[]): void {
        this.allMoves = data;
    }

	findByName(name: string) {
		if (!name || !name.trim()) return null;

		return find(this.allMoves, type => name.toLowerCase().trim() === type.name.toLowerCase().trim());
	}

	getMoveDPS(moveName: string) {
		let move = this.findByName(moveName);

		return Utils.round(move.power / move.durationMs * 1000, 4);
	}

	getMoveDPE(moveName: string) {
		let move = this.findByName(moveName);

		return Utils.round(move.power / Math.abs(move.energyDelta), 4);
	}

	getMoveDPS_DPE(moveName: string) {
		return Utils.round(this.getMoveDPS(moveName) * this.getMoveDPE(moveName), 4);
	}

	getDPS(moveName: string, damage: number) {
		let move = this.findByName(moveName);

		return Utils.round(damage / move.durationMs * 1000, 4);
	}

	getDPE(moveName: string, damage: number) {
		let move = this.findByName(moveName);

		return Utils.round(damage / Math.abs(move.energyDelta), 4);
	}

	getDPS_DPE(moveName: string, damage: number) {
		return Utils.round(this.getDPS(moveName, damage) * this.getDPE(moveName, damage), 4);
	}

    static getInstance(): MoveHelper {
        if (instance === null) {
            instance = new MoveHelper(token);
        }

        return instance;
    }
}

// Function getMoveHelper(): MoveHelper {
//     return MoveHelper.getInstance();
// }
// export getMoveHelper;
