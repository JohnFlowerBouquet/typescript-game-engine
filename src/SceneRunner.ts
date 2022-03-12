import { GameContext } from "./interface";
import Scene from "./Scene";

export default class SceneRunner {
    private readonly _scenes: Scene[] = [];
    private _sceneIndex = 0;

    public update(gameContext: GameContext): void {
        const currentScene = this._scenes[this._sceneIndex];
        if (currentScene) {
            currentScene.update(gameContext);
            currentScene.draw(gameContext);
        }
    }

    public runNext(): void {
        const currentScene = this._scenes[this._sceneIndex];
        if (currentScene) {
            currentScene.pause();
        }
        this._sceneIndex++;
    }

    public addScene(scene: Scene): void {
        scene.events.listen(Scene.EVENT_COMPLETE, () => {
            this.runNext();
        })
        this._scenes.push(scene);
    }
}