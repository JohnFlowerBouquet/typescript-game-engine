import { TILE_SIZE } from "./globals";
import { loadImage } from "./loaders";
import SpriteSheet from "./spritesheet";

export function loadMarioSprite(): Promise<SpriteSheet> {
  return loadImage("/assets/characters.gif").then(image => {
    const sprites = new SpriteSheet(image, TILE_SIZE.width, TILE_SIZE.height);
    sprites.define('mario', 276, 44, 16, 16);
    return sprites;
  })
}