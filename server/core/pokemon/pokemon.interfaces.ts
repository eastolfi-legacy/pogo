interface IIdentifier {
    id: string;
    name: string;
}

interface IEvolutionCost {
    candyCost: number;
    evolutionItem?: IIdentifier;
}

interface IEvolution {
    id: string;
    name: string;
    costToEvolve: IEvolutionCost;
    futureBranch?: IEvolution[];
}

export interface IPokemon {
    animationTime: number[];
    camera: { cylinderRadius: number, diskRadius: number, shoulderModeScale: number };
    cinematicMoves: IIdentifier[];
    dex: number;
    encounter: {
        attackProbability: number;
        attackTimer: number;
        baseCaptureRate: number;
        baseFleeRate: number;
        cameraDistance: number;
        collisionRadius: number;
        dodgeDistance: number;
        dodgeProbability: number;
        gender: { femalePercent: number, malePercent: number };
        jumpTime: number;
        maxPokemonActionFrequency: number;
        minPokemonActionFrequency: number;
        movementType: IIdentifier;
    };
    evolution: {
        costToEvolve: IEvolutionCost;
        futureBranch?: IEvolution[],
        pastBranch: IIdentifier
    };
    family: IIdentifier;
    height: number;
    id: string;
    kmBuddyDistance: number;
    maxCP: number;
    modelHeight: number;
    modelScale: number;
    name: string;
    quickMoves: IIdentifier[];
    stats: { baseAttack: number, baseDefense: number, baseStamina: number };
    types: IIdentifier[];
    weight: number;
}
