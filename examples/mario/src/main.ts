import CompositionScene from "../../../src/CompositionScene";
import Entity from "../../../src/Entity";
import { loadFont } from "../../../src/font";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../src/index";
import { setupKeyboard } from "../../../src/input";
import { GameContext } from "../../../src/interface";
import { createCollisionLayer } from "../../../src/layers/collision";
import { createColorLayer } from "../../../src/layers/color";
import { createDashboardLayer } from "../../../src/layers/dashboard";
import { createPlayerProgerssLayer } from "../../../src/layers/player-progress";
import { createTextLayer } from "../../../src/layers/text";
import Level from "../../../src/Level";
import { loadEntities } from "../../../src/loaders/entities";
import { createLevelLoader, TriggerSpec } from "../../../src/loaders/level";
import { createPlayer, createPlayerEnv } from "../../../src/player";
import Scene from "../../../src/Scene";
import SceneRunner from "../../../src/SceneRunner";
import Timer from "../../../src/Timer";
import Trigger from "../../../src/traits/Trigger";
import { getCanvasWithContext } from "../../../src/utils/getCanvasWithContext";

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

    async function runLevel(name: string) {
        const loadScreen = new Scene();
        loadScreen.compositor.addLayer(createColorLayer("#000"));
        loadScreen.compositor.addLayer(createTextLayer(font, `Loading ${name}`))
        sceneRunnder.addScene(loadScreen);
        sceneRunnder.runNext();

        const level = await loadLevel(name);

        const triggerCallback = (spec: TriggerSpec, trigger: Trigger, collidingEntities: Entity[]) => {
            if (spec.type === "goto") {
                for (const entity of collidingEntities) {
                    if (entity.hasTrait("player")) {
                        runLevel(spec.name);
                        return;
                    }
                }
            }
        }
        level.events.listen(Level.EVENT_TRIGGER, triggerCallback);

        const playerProgressLayer = createPlayerProgerssLayer(font, level);
        const dashboardLayer = createDashboardLayer(font, level);

        mario.position.set(0, 0);
        level.entities.add(mario);

        const playerEnv = createPlayerEnv(mario);
        level.entities.add(playerEnv);

        const waitScreen = new CompositionScene();
        waitScreen.compositor.addLayer(createColorLayer("#000"));
        waitScreen.compositor.addLayer(dashboardLayer);
        waitScreen.compositor.addLayer(playerProgressLayer);
        sceneRunnder.addScene(waitScreen);

        level.compositor.addLayer(dashboardLayer);
        sceneRunnder.addScene(level);

        level.musicController.playTrack("main");

        sceneRunnder.runNext();

        if (process.env.NODE_ENV !== "production") {
            // setupMouseControl(canvas, mario, camera);
            level.compositor.addLayer(createCollisionLayer(level));
            // level.compositor.addLayer(createCameraLayer(camera));
        }
    }

    const gameContext: GameContext = {
        deltaTime: 0,
        audioContext,
        videoContext: context,
        entityFactory
    };

    const timer = new Timer();
    timer.updateFunction = (deltaTime: number) => {
        gameContext.deltaTime = deltaTime;
        sceneRunnder.update(gameContext);
    };
    timer.start();

    runLevel("1");

    document.body.appendChild(canvas);
}

main();