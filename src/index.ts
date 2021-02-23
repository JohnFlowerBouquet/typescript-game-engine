import Keyboard from "./KeyboardState";
import { loadLevel } from "./loaders";
import Timer from "./Timer";
import { createPrince } from "./utilities";

export const CANVAS_WIDTH = 720;
export const CANVAS_HEIGHT = 480;

function createCanvas() {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.style.width = `${CANVAS_WIDTH}px`;
  canvas.style.height = `${CANVAS_HEIGHT}px`;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error(`SpriteSheet.draw(): Sprite not found`);
  }

  Promise.all([
    createPrince(),
    loadLevel('1'),
  ]).then(([prince, level]) => {    
    const gravity = 500;
    level.entities.add(prince);

    const input = new Keyboard();
    input.addMaping("Space", keyState => {
      if (keyState) {
        prince.trait("jump").start();
      } else {
        prince.trait("jump").cancel();
      }
    })
    input.listenTo();

    const timer = new Timer();
    timer.updateFunction = (deltaTime) => {
      level.update(deltaTime);
      level.compositor.draw(context);
      prince.velocity.y += gravity * deltaTime;
    }

    timer.start();
  })
  return canvas;
}

document.body.appendChild(createCanvas());