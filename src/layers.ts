import Entity from "./Entity";
import { TILE_SIZE } from "./globals";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./index";
import Level from "./Level";
import Matrix from "./Matrix";
import SpriteSheet from "./spritesheet";

export function createBackgroundLayer(level: Level, sprites: SpriteSheet): (context: CanvasRenderingContext2D) => void {
    const buffer = document.createElement("canvas");
    const bufferContext = buffer.getContext("2d");
    buffer.width = CANVAS_WIDTH;
    buffer.height = CANVAS_HEIGHT;
  
    if (!bufferContext) {
      throw new Error(`SpriteSheet.draw(): Sprite not found`);
    }

    level.tiles.forEach((tile, x, y) => {
      sprites.drawTile(tile.name, bufferContext, x, y)
    })
  
    return (context: CanvasRenderingContext2D) => context.drawImage(buffer, 0, 0);
}

export function createSpriteLayer(entities: Set<Entity>): (context: CanvasRenderingContext2D) => void {
  return (context: CanvasRenderingContext2D) => entities.forEach(entity => entity.draw(context));
}

export function createCollisionLayer(level: Level) {
  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const resolvedTiles = new Matrix();

  const getByIndexOriginal = tileResolver.getByIndex;

  tileResolver.getByIndex = function getByIndexFake(x, y) {
      resolvedTiles.set(x, y, {name: '', x1: x, x2: x + TILE_SIZE.width, y1: y, y2: y + TILE_SIZE.height});
      return getByIndexOriginal.call(tileResolver, x, y);
  }

  return function drawCollisions(context: CanvasRenderingContext2D) {
      context.strokeStyle = 'blue';
      resolvedTiles.forEach((value, x, y) => {
          context.beginPath();
          context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
          context.stroke();
      });

      context.strokeStyle = 'yellow';
      level.entities.forEach(entity => {
        context.beginPath();
        context.rect(entity.position.x, entity.position.y, entity.size.x, entity.size.y);
        context.stroke();
    });
      resolvedTiles.clear();
  };
} 