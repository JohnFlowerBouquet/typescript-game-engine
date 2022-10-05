import { GameContext } from "./interface";
import Scene from "./Scene";

export default class SceneRunner {
    private _currentScene!: Scene;

    public update(gameContext: GameContext): void {
        if (this._currentScene) {
            this._currentScene.update(gameContext);
            this._currentScene.draw(gameContext);
        }
    }

    public run(scene: Scene): void {
        this._currentScene?.pause();
        this._currentScene = scene;
    }
}