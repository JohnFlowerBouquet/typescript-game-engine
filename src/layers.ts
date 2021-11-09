import Camera from "./Camera";
import Entity from "./Entity";
import { TILE_SIZE } from "./globals";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./index";
import Level from "./Level";
import Matrix from "./Matrix";
import SpriteSheet from "./spritesheet";
import { getCanvasWithContext } from "./utils/getContext";

export function createBackgroundLayer(
    level: Level,
    sprites: SpriteSheet
): (context: CanvasRenderingContext2D, camera: Camera) => void {
    const buffer = document.createElement("canvas");
    const bufferContext = buffer.getContext("2d");
    buffer.width = CANVAS_WIDTH;
    buffer.height = CANVAS_HEIGHT;

    if (!bufferContext) {
        throw new Error(`SpriteSheet.draw(): Sprite not found`);
    }

    level.tiles.forEach((tile, x, y) => {
        sprites.drawTile(tile.name, bufferContext, x, y);
    });

    return (context: CanvasRenderingContext2D, camera: Camera) =>
        context.drawImage(buffer, -camera.position.x, -camera.position.y);
}

export function createSpriteLayer(
    entities: Set<Entity>,
    width = 64,
    height = 64
): (context: CanvasRenderingContext2D, camera: Camera) => void {
    const { canvas: spriteBuffer, context: spriteBufferContext } =
        getCanvasWithContext(width, height);

    return (context: CanvasRenderingContext2D, camera: Camera) =>
        entities.forEach((entity) => {
            spriteBufferContext.clearRect(0, 0, width, height);
            entity.draw(spriteBufferContext);
            context.drawImage(
                spriteBuffer,
                entity.position.x - camera.position.x,
                entity.position.y - camera.position.y
            );
        });
}

export function createCollisionLayer(level: Level) {
    const tileResolver = level.tileCollider.tiles;
    const tileSize = tileResolver.tileSize;

    const resolvedTiles = new Matrix();

    const getByIndexOriginal = tileResolver.getByIndex;

    tileResolver.getByIndex = function getByIndexFake(x, y) {
        resolvedTiles.set(x, y, {
            name: "",
            x1: x,
            x2: x + TILE_SIZE.width,
            y1: y,
            y2: y + TILE_SIZE.height,
        });
        return getByIndexOriginal.call(tileResolver, x, y);
    };

    return function drawCollisions(context: CanvasRenderingContext2D, camera: Camera) {
        context.strokeStyle = "blue";
        resolvedTiles.forEach((value, x, y) => {
            context.beginPath();
            context.rect(x * tileSize - camera.position.x, y * tileSize - camera.position.y, tileSize, tileSize);
            context.stroke();
        });

        context.strokeStyle = "yellow";
        level.entities.forEach((entity) => {
            context.beginPath();
            context.rect(
                entity.position.x - camera.position.x,
                entity.position.y - camera.position.y,
                entity.size.x,
                entity.size.y
            );
            context.stroke();
        });
        resolvedTiles.clear();
    };
}
