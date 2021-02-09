import { loadImage } from "./loaders";
import SpriteSheet from "./spritesheet";

export function loadPrinceSprite(): Promise<SpriteSheet> {
    return loadImage("/assets/princeSpritesheet.png").then(image => {
      const sprites = new SpriteSheet(image, 10, 41);
      sprites.define('prince', 0, 0, 10, 41);
      return sprites;
    })
}
  
export function loadBackgroundSprites(): Promise<SpriteSheet> {
    return loadImage("/assets/spritesheet.png").then(image => {
      const sprites = new SpriteSheet(image, 32, 21);
      sprites.defineTile('empty', 0, 0);
      sprites.defineTile('kerbstone', 32, 0);       
      sprites.defineTile('pavement', 96, 0);
      sprites.defineTile('block', 64, 0);
      return sprites;
    })
}