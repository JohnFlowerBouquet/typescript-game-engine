import { GameContext } from "./interface";
import Level from "./Level";

export default class SceneRunner {
    scenes: Level[] = [];
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

    public addScene(scene: Level): void {
        this.scenes.push(scene);
    }
}