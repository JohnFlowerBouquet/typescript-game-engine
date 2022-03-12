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
import { createPlayerProgerssLayer } from "./layers/player-progress";
import CompositionScene from "./CompositionScene";
import { createColorLayer } from "./layers/color";

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

    const mario = createPlayer(entityFactory["mario"](), "MARIO");
    const inputRouter = setupKeyboard(window);
    inputRouter.addReceiver(mario);

    if (process.env.NODE_ENV !== "production") {
        // setupMouseControl(canvas, mario, camera);
        // level.compositor.addLayer(createCollisionLayer(level));
        // level.compositor.addLayer(createCameraLayer(camera));
    }

    async function runLevel(name: string) {
        const level = await loadLevel(name);

        const playerProgressLayer = createPlayerProgerssLayer(font, level);
        const dashboardLayer = createDashboardLayer(font, level);

        level.entities.add(mario);

        const playerEnv = createPlayerEnv(mario);
        level.entities.add(playerEnv);

        const waitScreen = new CompositionScene();createColorLayer
        waitScreen.compositor.addLayer(createColorLayer("#000"));
        waitScreen.compositor.addLayer(dashboardLayer);
        waitScreen.compositor.addLayer(playerProgressLayer);
        sceneRunnder.addScene(waitScreen);

        level.compositor.addLayer(dashboardLayer);
        sceneRunnder.addScene(level);

        level.musicController.playTrack("main");
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
    runLevel("2");

    document.body.appendChild(canvas);
}

main();
