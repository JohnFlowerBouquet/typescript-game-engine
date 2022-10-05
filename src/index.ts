import Timer from "./Timer";
import { getCanvasWithContext } from "./utils/getCanvasWithContext";
import { GameContext } from "./interface";
import SceneRunner from "./SceneRunner";

export const CANVAS_WIDTH = 256 + 16;
export const CANVAS_HEIGHT = 256;

async function main(): Promise<void> {
    const { canvas, context } = getCanvasWithContext(
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );

    const sceneRunner = new SceneRunner();
    const audioContext = new AudioContext();
    const entityFactory = {};

    const gameContext: GameContext = {
        deltaTime: 0,
        audioContext,
        videoContext: context,
        entityFactory,
        sceneRunner
    };

    const timer = new Timer();
    timer.updateFunction = (deltaTime) => {
        gameContext.deltaTime = deltaTime;
        sceneRunner.update(gameContext);
    };
    timer.start();

    document.body.appendChild(canvas);
}

main();
