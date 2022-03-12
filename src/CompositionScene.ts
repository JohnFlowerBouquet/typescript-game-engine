import { GameContext } from "./interface";
import Scene from "./Scene";

export default class CompositionScene extends Scene {
    private _countdown = 2;

    public update(gameContext: GameContext): void {
        this._countdown -= gameContext.deltaTime;
        if (this._countdown <= 0) {
            this.events.emit(Scene.EVENT_COMPLETE);
        }
    }
}