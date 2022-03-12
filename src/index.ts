import { setupKeyboard } from "./input";
import { createLevelLoader } from "./loaders/level";
import Timer from "./Timer";
import { getCanvasWithContext } from "./utils/getCanvasWithContext";
import { loadEntities } from "./loaders/entities";
import { loadFont } from "./font";
import { createDashboardLayer } from "./layers/dashboard";
import { GameContext } from "./interface";
import { createPlayer, createPlayerEnv } from "./player";
import SceneRunner from "./SceneRunner";

export const CANVAS_WIDTH = 256 + 16;
export const CANVAS_HEIGHT = 256;

async function main(): Promise<void> {
    const { canvas, context } = getCanvasWithContext(
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );

    const sceneRunnder = new SceneRunner();
    const audioContext = new AudioContext();
    const entityFactory = await loadEntities(audioContext);
    const font = await loadFont();

    const loadLevel = createLevelLoader(entityFactory);
    const level = await loadLevel("2");
    sceneRunnder.addScene(level);

    const mario = createPlayer(entityFactory["mario"](), "MARIO");

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);
    level.compositor.addLayer(createDashboardLayer(font, level));

    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);

    if (process.env.NODE_ENV !== "production") {
        // setupMouseControl(canvas, mario, camera);
        // level.compositor.addLayer(createCollisionLayer(level));
        // level.compositor.addLayer(createCameraLayer(camera));
    }

    const gameContext: GameContext = {
        deltaTime: 0,
        audioContext,
        videoContext: context,
        entityFactory
    };

    const timer = new Timer();
    timer.updateFunction = (deltaTime) => {

        gameContext.deltaTime = deltaTime;
        sceneRunnder.update(gameContext);
    };

    timer.start();
    level.musicController.playTrack("main");

    document.body.appendChild(canvas);
}

main();
