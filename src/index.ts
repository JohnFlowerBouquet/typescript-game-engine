import Compositor from "./Compositor";
import { Position } from "./interface";
import { createBackgroundLayer } from "./layers";
import { loadLevel } from "./loaders";
import { loadBackgroundSprites, loadPrinceSprite } from "./sprites";
import SpriteSheet from "./spritesheet";

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
    loadPrinceSprite(),
    loadBackgroundSprites(),
    loadLevel('1'),
  ]).then(([princeSprite, backgroundSprites, level]) => {
    const compositor = new Compositor();
    const backgroundLayer = createBackgroundLayer(level.map, backgroundSprites);
    compositor.addLayer(backgroundLayer);
    
    const pos = {
      x: 150,
      y: 35
    };

    const spriteLayer = createSpriteLayer(princeSprite, pos);
    compositor.addLayer(spriteLayer);

    function update(): void {
      if (!context) {
        throw new Error(`SpriteSheet.draw(): Sprite not found`);
      }
      compositor.draw(context);
      pos.x += 2;
      pos.y += 2;
      requestAnimationFrame(update)
    }

    update();
    
  })
  return canvas;
}

function createSpriteLayer(sprite: SpriteSheet, pos: Position): (context: CanvasRenderingContext2D) => void {
  return (context: CanvasRenderingContext2D) => sprite.draw('prince', context, pos.x, pos.y);
}

document.body.appendChild(createCanvas());