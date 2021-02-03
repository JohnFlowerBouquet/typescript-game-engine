import { loadImage, loadLevel } from "./loaders";
import SpriteSheet from "./spritesheet";

function createCanvas() {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  canvas.style.width = "720px";
  canvas.style.height = "480px";
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error(`SpriteSheet.draw(): Sprite not found`);
  }

  loadImage("/assets/spritesheet.png").then(image => {
    const sprites = new SpriteSheet(image, 32, 21);
    sprites.define('kerbstone', 32, 0);
    sprites.define('empty', 0, 0);    
    sprites.define('pavement', 96, 0);
    sprites.define('block', 64, 0);
    
    loadLevel('1').then(level => level.map.forEach((levelRow, y) => {
      sprites.drawTopKerbstone(context, levelRow.length);
      levelRow.forEach((tile, x) => sprites.drawTile(tile, context, x, y))
    }));
  })

  return canvas;
}

document.body.appendChild(createCanvas());