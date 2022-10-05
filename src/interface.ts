import { EntityFactory } from "./loaders/entities";
import SceneRunner from "./SceneRunner";

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
    videoContext: CanvasRenderingContext2D;
    entityFactory: EntityFactory;
    sceneRunner: SceneRunner;
}