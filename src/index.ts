import { createMario } from "./entities/mario";
import { setupKeyboard } from "./input";
import { createCollisionLayer } from "./layers";
import { loadLevel } from "./loaders";
import Timer from "./Timer";
import { isMouseEvent } from "./typeGuards";

export const CANVAS_WIDTH = 640;
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
    level.entities.add(mario);

    const input = setupKeyboard(mario);
    input.listenTo();

    if (process.env.NODE_ENV !== 'production') {
      // DEVELOPMENT HELPERS
      ['mousedown', 'mouseup'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
          if (isMouseEvent(event) && event.buttons === 1) {
            mario.velocity.set(0, 0);
            mario.position.set(event.offsetX, event.offsetY);
          }
        })
      })

      level.compositor.addLayer(createCollisionLayer(level));
    }

    const timer = new Timer();
    timer.updateFunction = (deltaTime) => {
      level.update(deltaTime);
      level.compositor.draw(context);
    }

    timer.start();
  })
  return canvas;
}

document.body.appendChild(createCanvas());