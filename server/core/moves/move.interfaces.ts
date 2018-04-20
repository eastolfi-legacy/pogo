interface IIdentifier {
    id: string;
    name: string;
}

export interface IMove {
    accuracyChange: number;
    animationId: number;
    criticalChance: number;
    damageWindowEndMs: number;
    damageWindowStartMs: number;
    durationMs: number;
    energyDelta: number;
    id: string;
    internalId: number;
    name: string;
    pokemonType: IIdentifier;
    power: number;
    staminaLossScalar: number;
    trainerLevelMax: number;
    trainerLevelMin: number;
    vfxName: string;
}
