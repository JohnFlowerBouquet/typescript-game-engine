import Camera from "./Camera";
import { setupKeyboard } from "./input";
import { createLevelLoader } from "./loaders/level";
import Timer from "./Timer";
import { setupMouseControl } from "./utils/debug";
import { getCanvasWithContext } from "./utils/getCanvasWithContext";
import { loadEntities } from "./loaders/entities";
import { createCollisionLayer } from "./layers/collision";
import { createCameraLayer } from "./layers/camera";
import { loadFont } from "./font";
import { createDashboardLayer } from "./layers/dashboard";
import { GameContext } from "./interface";
import { createPlayer, createPlayerEnv } from "./player";

export const CANVAS_WIDTH = 256 + 16;
export const CANVAS_HEIGHT = 256;

async function main(): Promise<void> {
    const { canvas, context } = getCanvasWithContext(
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );

    const audioContext = new AudioContext();
    const entityFactory = await loadEntities(audioContext);
    const font = await loadFont();

    const loadLevel = createLevelLoader(entityFactory);
    const level = await loadLevel("1");

    const camera = new Camera();
    const mario = createPlayer(entityFactory["mario"]());

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);
    level.compositor.addLayer(createDashboardLayer(font, playerEnv));

    const input = setupKeyboard(mario);
    input.listenTo();

    if (process.env.NODE_ENV !== "production") {
        setupMouseControl(canvas, mario, camera);
        level.compositor.addLayer(createCollisionLayer(level));
        level.compositor.addLayer(createCameraLayer(camera));
    }

    const gameContext: GameContext = {
        deltaTime: 0,
        audioContext
    };

    const timer = new Timer();
    timer.updateFunction = (deltaTime) => {

        gameContext.deltaTime = deltaTime;
        level.update(gameContext);

        level.compositor.draw(context, camera);

        camera.position.x = Math.max(0, mario.position.x - 100);
    };

    timer.start();

    document.body.appendChild(canvas);
}

main();
