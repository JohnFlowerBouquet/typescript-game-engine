import { createPrince } from "./entities/prince";
import { setupKeyboard } from "./input";
import { createCollisionLayer } from "./layers";
import { loadLevel } from "./loaders";
import Timer from "./Timer";
import { isMouseEvent } from "./typeGuards";

export const CANVAS_WIDTH = 720;
export const CANVAS_HEIGHT = 480;

function createCanvas() {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  // canvas.style.width = `${CANVAS_WIDTH}px`;
  // canvas.style.height = `${CANVAS_HEIGHT}px`;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error(`SpriteSheet.draw(): Sprite not found`);
  }

  Promise.all([
    createPrince(),
    loadLevel('1'),
  ]).then(([prince, level]) => {    
    level.entities.add(prince);

    const input = setupKeyboard(prince);
    input.listenTo();

    if (process.env.NODE_ENV !== 'production') {
      // DEVELOPMENT HELPERS
      ['mousedown', 'mouseup'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
          if (isMouseEvent(event) && event.buttons === 1) {
            prince.velocity.set(0, 0);
            prince.position.set(event.offsetX, event.offsetY);
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