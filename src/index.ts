import Camera from "./Camera";
import { setupKeyboard } from "./input";
import { createLevelLoader } from "./loaders/level";
import Timer from "./Timer";
import { setupMouseControl } from "./utils/debug";
import { getCanvasWithContext } from "./utils/getCanvasWithContext";
import { loadEntities } from "./loaders/entities";
import Entity from "./Entity";
import SpriteSheet from "./SpriteSheet";
import PlayerController from "./traits/PlayerController";
import { createCollisionLayer } from "./layers/collision";
import { createCameraLayer } from "./layers/camera";
import { loadFont } from "./font";
import { createDashboardLayer } from "./layers/dashboard";

export const CANVAS_WIDTH = 256 + 16;
export const CANVAS_HEIGHT = 256;

function createPlayerEnv(playerEntity: Entity): Entity {
    const imageStub = new Image();
    const playerEnv = new Entity(new SpriteSheet(imageStub, 0, 0), () => ({frameName: "", isFlipped: false}));
    const playerController = new PlayerController();
    playerController.setPlayer(playerEntity);
    playerController.setCheckpoint(64, 64);
    playerEnv.addTrait(playerController);
    return playerEnv;
}

async function main(): Promise<void> {
    const { canvas, context } = getCanvasWithContext(
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );

    const entityFactory = await loadEntities();
    const font = await loadFont();

    const loadLevel = createLevelLoader(entityFactory);
    const level = await loadLevel("1");
    level.compositor.addLayer(createDashboardLayer(font));

    const camera = new Camera();
    const mario = entityFactory["mario"]();

    const playerEnv = createPlayerEnv(mario);
    level.entities.add(playerEnv);

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

        camera.position.x = Math.max(0, mario.position.x - 100);
    };

    timer.start();

    document.body.appendChild(canvas);
}

main();
