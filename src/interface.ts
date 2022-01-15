import AudioBoard from "./AudioBoard";

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
    audioBoard: AudioBoard;
    deltaTime: number;
}