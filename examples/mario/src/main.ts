import { loadFont } from "../../../src/font";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../src/index";
import { setupKeyboard } from "../../../src/input";
import { GameContext } from "../../../src/interface";
import { loadEntities } from "../../../src/loaders/entities";
import { createPlayer } from "../../../src/player";
import SceneRunner from "../../../src/SceneRunner";
import Timer from "../../../src/Timer";
import { getCanvasWithContext } from "../../../src/utils/getCanvasWithContext";
import { Levels } from "./Scenes/Levels";
import { LoadScreen } from "./Scenes/LoadScreen";

async function main(): Promise<void> {
    // Engine setup
    const { canvas, context } = getCanvasWithContext(
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );

    const sceneRunner = new SceneRunner();
    const audioContext = new AudioContext();
    const entityFactory = await loadEntities(audioContext);
    const font = await loadFont();

    const gameContext: GameContext = {
        deltaTime: 0,
        audioContext,
        videoContext: context,
        entityFactory, // TODO: I think this should be inside level scope
        sceneRunner
    };

    const timer = new Timer();
    timer.updateFunction = (deltaTime: number) => {
        gameContext.deltaTime = deltaTime;
        sceneRunner.update(gameContext);
    };
    timer.start();

    // Loading screen
    const loadScreen = LoadScreen(font, "");
    sceneRunner.run(loadScreen);

    // Player setup
    const mario = createPlayer(entityFactory["mario"](), "MARIO");
    mario.position.set(0, 0);
    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);

    // Levels setup
    const level = await Levels(gameContext, "1", mario, font);
    sceneRunner.run(level);

    document.body.appendChild(canvas);
}

main();