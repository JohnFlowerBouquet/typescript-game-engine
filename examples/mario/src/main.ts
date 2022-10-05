import Entity from "../../../src/Entity";
import { loadFont } from "../../../src/font";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../src/index";
import { setupKeyboard } from "../../../src/input";
import { GameContext } from "../../../src/interface";
import { createCollisionLayer } from "../../../src/layers/collision";
import { createDashboardLayer } from "../../../src/layers/dashboard";
import { createPlayerProgerssLayer } from "../../../src/layers/player-progress";
import Level from "../../../src/Level";
import { loadEntities } from "../../../src/loaders/entities";
import { createLevelLoader, TriggerSpec } from "../../../src/loaders/level";
import { createPlayer, createPlayerEnv } from "../../../src/player";
import SceneRunner from "../../../src/SceneRunner";
import Timer from "../../../src/Timer";
import Trigger from "../../../src/traits/Trigger";
import { getCanvasWithContext } from "../../../src/utils/getCanvasWithContext";
import { LoadScreen } from "./Scenes/LoadScreen";
import { WaitingScreen } from "./Scenes/WaitingScreen";

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
        
        const loadScreen = LoadScreen(font, name);
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
        

        mario.position.set(0, 0);
        level.entities.add(mario);

        const playerEnv = createPlayerEnv(mario);
        level.entities.add(playerEnv);

        const dashboardLayer = createDashboardLayer(font, level);
        const playerProgressLayer = createPlayerProgerssLayer(font, level);
        const waitingScreen = WaitingScreen(dashboardLayer, playerProgressLayer);
        sceneRunnder.addScene(waitingScreen);

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