import Compositor from "./Compositor";
import { createBackgroundLayer, createSpriteLayer } from "./layers";
import { loadLevel } from "./loaders";
import { loadBackgroundSprites } from "./sprites";
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
    loadBackgroundSprites(),
    loadLevel('1'),
  ]).then(([prince, backgroundSprites, level]) => {
    const compositor = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.map, backgroundSprites);
    compositor.addLayer(backgroundLayer);
    
    const gravity = 0.6;

    const spriteLayer = createSpriteLayer(prince);
    compositor.addLayer(spriteLayer);

    const timer = new Timer();
    timer.updateFunction = (deltaTime) => {
      compositor.draw(context);
      prince.update(deltaTime);
      prince.velocity.y += gravity;
    }

    timer.start();
  })
  return canvas;
}

document.body.appendChild(createCanvas());