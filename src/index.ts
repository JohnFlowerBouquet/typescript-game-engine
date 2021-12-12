import Camera from "./Camera";
import { setupKeyboard } from "./input";
import { createCameraLayer, createCollisionLayer } from "./layers";
import { createLevelLoader } from "./loaders/level";
import Timer from "./Timer";
import { setupMouseControl } from "./utils/debug";
import { getCanvasWithContext } from "./utils/getCanvasWithContext";
import { loadEntities } from "./loaders/entities";

export const CANVAS_WIDTH = 256 + 16;
export const CANVAS_HEIGHT = 256;

async function main(): Promise<void> {
    const { canvas, context } = getCanvasWithContext(
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );

    const entityFactory = await loadEntities();
    const loadLevel = createLevelLoader(entityFactory);
    const level = await loadLevel("1");

    const camera = new Camera();
    const mario = entityFactory["mario"]();
    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo();

    if (process.env.NODE_ENV !== "production") {
        setupMouseControl(canvas, mario, camera);
        level.compositor.addLayer(createCollisionLayer(level));
        level.compositor.addLayer(createCameraLayer(camera));
    }

    const timer = new Timer();
    timer.updateFunction = (deltaTime) => {
        level.update(deltaTime);
        level.compositor.draw(context, camera);

        if (mario.position.x > 100) {
            camera.position.x = mario.position.x - 100;
        }
    };

    timer.start();

    document.body.appendChild(canvas);
}

main();
