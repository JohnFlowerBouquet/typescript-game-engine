import Camera from "./Camera";
import { createMario } from "./entities/mario";
import { setupKeyboard } from "./input";
import { createCameraLayer, createCollisionLayer } from "./layers";
import { loadLevel } from "./loaders";
import Timer from "./Timer";
import { setupMouseControl } from "./utils/debug";

export const CANVAS_WIDTH = 256 + 16;
export const CANVAS_HEIGHT = 640;

function createCanvas() {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error(`SpriteSheet.draw(): Sprite not found`);
  }

  Promise.all([
    createMario(),
    loadLevel('1'),
  ]).then(([mario, level]) => {    
    const camera = new Camera();

    level.entities.add(mario);

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
    }

    timer.start();
  })
  return canvas;
}

document.body.appendChild(createCanvas());