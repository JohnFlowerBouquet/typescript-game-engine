import Camera from "./Camera";
import { loadMario } from "./entities/mario";
import { loadGoomba } from "./entities/goomba";
import { setupKeyboard } from "./input";
import { createCameraLayer, createCollisionLayer } from "./layers";
import { loadLevel } from "./loaders/level";
import Timer from "./Timer";
import { setupMouseControl } from "./utils/debug";
import { getCanvasWithContext } from "./utils/getCanvasWithContext";

export const CANVAS_WIDTH = 256 + 16;
export const CANVAS_HEIGHT = 640;

function createCanvas() {
  const {canvas, context} = getCanvasWithContext(CANVAS_WIDTH, CANVAS_HEIGHT);

  Promise.all([
    loadMario(),
    loadGoomba(),
    loadLevel('1'),
  ]).then(([createMario, createGoomba, level]) => {    
    const camera = new Camera();
    const mario = createMario();
    const goomba = createGoomba();

    level.entities.add(mario);
    level.entities.add(goomba);

    const input = setupKeyboard(mario);
    input.listenTo();

    if (process.env.NODE_ENV !== 'production') {
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
    }

    timer.start();
  })
  return canvas;
}

document.body.appendChild(createCanvas());