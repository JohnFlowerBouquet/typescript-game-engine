import Entity from "./Entity";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./index";
import { LevelMapRow } from "./interface";
import SpriteSheet from "./spritesheet";

export function createBackgroundLayer(map: LevelMapRow[], sprites: SpriteSheet): (context: CanvasRenderingContext2D) => void {
    const buffer = document.createElement("canvas");
    const bufferContext = buffer.getContext("2d");
    buffer.width = CANVAS_WIDTH;
    buffer.height = CANVAS_HEIGHT;
  
    if (!bufferContext) {
      throw new Error(`SpriteSheet.draw(): Sprite not found`);
    }
  
    map.forEach((levelRow, y) => {
      sprites.drawTopKerbstone(bufferContext, levelRow.length);
      levelRow.forEach((tile, x) => sprites.drawTile(tile, bufferContext, x, y))
    });
  
    return (context: CanvasRenderingContext2D) => context.drawImage(buffer, 0, 0);
}

export function createSpriteLayer(entity: Entity): (context: CanvasRenderingContext2D) => void {
  return (context: CanvasRenderingContext2D) => entity.draw(context);
}