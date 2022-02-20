import { EntityFactory } from "./loaders/entities";

export interface Position {
    x: number,
    y: number
}

export interface Animation {
    name: string;
    frameLength: number;
    frames: string[];
}

export interface GameContext {
    deltaTime: number;
    audioContext: AudioContext;
    entityFactory: EntityFactory;
}