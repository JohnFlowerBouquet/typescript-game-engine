import SpriteSheet from "./spritesheet";

function createCanvas() {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error(`SpriteSheet.draw(): Sprite "${name}" not found`);
  }

  loadImage("/assets/block.jpg").then(image => {
    const sprites = new SpriteSheet(image, 173, 120);
    sprites.define('ground', 0, 0);
    sprites.draw('ground', context, 0, 0);
    sprites.draw('ground', context, 173, 0);
  })

  return canvas;
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image))
    image.src = url;
  })
}

document.body.appendChild(createCanvas());