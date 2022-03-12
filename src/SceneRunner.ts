import { GameContext } from "./interface";
import Scene from "./Scene";

export default class SceneRunner {
    scenes: Scene[] = [];
    sceneIndex = 0;

    public update(gameContext: GameContext): void {
        const currentScene = this.scenes[this.sceneIndex];
        if (currentScene) {
            currentScene.update(gameContext);
            currentScene.draw(gameContext);
        }
    }

    public runNext(): void {
        this.sceneIndex++;
    }

    public addScene(scene: Scene): void {
        scene.events.listen(Scene.EVENT_COMPLETE, () => {
            this.runNext();
        })
        this.scenes.push(scene);
    }
}