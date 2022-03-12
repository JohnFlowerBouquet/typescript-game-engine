import { setupKeyboard } from "./input";
import { createLevelLoader, TriggerSpec } from "./loaders/level";
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
import { createCollisionLayer } from "./layers/collision";
import Level from "./Level";
import Trigger from "./traits/Trigger";
import Entity from "./Entity";
import Scene from "./Scene";
import { createTextLayer } from "./layers/text";

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
    timer.updateFunction = (deltaTime) => {
        gameContext.deltaTime = deltaTime;
        sceneRunnder.update(gameContext);
    };
    timer.start();

    runLevel("1");

    document.body.appendChild(canvas);
}

main();
