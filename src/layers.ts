import Entity from "./Entity";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./index";
import Level from "./Level";
import SpriteSheet from "./spritesheet";

export function createBackgroundLayer(level: Level, sprites: SpriteSheet): (context: CanvasRenderingContext2D) => void {
    const buffer = document.createElement("canvas");
    const bufferContext = buffer.getContext("2d");
    buffer.width = CANVAS_WIDTH;
    buffer.height = CANVAS_HEIGHT;
  
    if (!bufferContext) {
      throw new Error(`SpriteSheet.draw(): Sprite not found`);
    }

    level.tiles.grid.forEach((column, x) => {
      column.forEach((tile, y) => {
        sprites.drawTile(tile.name, bufferContext, x, y);
      })
    })
  
    return (context: CanvasRenderingContext2D) => context.drawImage(buffer, 0, 0);
}

export function createSpriteLayer(entities: Set<Entity>): (context: CanvasRenderingContext2D) => void {
  return (context: CanvasRenderingContext2D) => entities.forEach(entity => entity.draw(context));
}