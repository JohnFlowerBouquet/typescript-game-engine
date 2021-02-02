import { loadImage, loadLevel } from "./loaders";
import SpriteSheet from "./spritesheet";

function createCanvas() {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error(`SpriteSheet.draw(): Sprite not found`);
  }

  loadImage("/assets/spritesheet.png").then(image => {
    const sprites = new SpriteSheet(image, 144, 144);
    sprites.define('block', 0, 0);
    sprites.define('kerbstone', 144, 0);
    sprites.define('pavement', 288, 0);
    sprites.define('wall1a', 432, 0);
    sprites.define('wall1b', 576, 0);

    loadLevel('1').then(level => level.map.forEach((levelRow, y) => levelRow.forEach((tile, x) => sprites.drawTile(tile, context, x, y))));
  })

  return canvas;
}

document.body.appendChild(createCanvas());