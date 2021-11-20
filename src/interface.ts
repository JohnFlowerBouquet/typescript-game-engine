export type LevelMapRow = string[];

export interface LevelMap {
    spriteSheet: string;
    map: LevelMapRow[];
}

export interface Position {
    x: number,
    y: number
}