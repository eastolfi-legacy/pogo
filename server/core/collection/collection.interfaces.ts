export interface ICollectionItem {
    name: string;
    pc: number;
    iv: number;
    attackFast: string;
    attackCharged: string;
    stats: { attack: number, defense: number, stamina: number };
}
