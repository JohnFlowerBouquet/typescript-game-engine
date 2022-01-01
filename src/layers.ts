import Camera from "./Camera";
import Entity from "./Entity";
import { TILE_SIZE } from "./globals";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./index";
import Level from "./Level";
import Matrix from "./Matrix";
import SpriteSheet from "./SpriteSheet";
import { getCanvasWithContext } from "./utils/getCanvasWithContext";

export type Layer = (context: CanvasRenderingContext2D, camera: Camera) => void;


export function createSpriteLayer(
    entities: Set<Entity>,
    width = 64,
    height = 64
): Layer {
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

export function createCollisionLayer(level: Level): Layer {
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

    return function drawCollisions(
        context: CanvasRenderingContext2D,
        camera: Camera
    ) {
        context.strokeStyle = "blue";
        resolvedTiles.forEach((value, x, y) => {
            context.beginPath();
            context.rect(
                x * tileSize - camera.position.x,
                y * tileSize - camera.position.y,
                tileSize,
                tileSize
            );
            context.stroke();
        });

        context.strokeStyle = "yellow";
        level.entities.forEach((entity) => {
            context.beginPath();
            context.rect(
                entity.hitBox.left - camera.position.x,
                entity.hitBox.top - camera.position.y,
                entity.size.x - entity.offset.x,
                entity.size.y - entity.offset.y
            );
            context.stroke();
        });
        resolvedTiles.clear();
    };
}

export function createCameraLayer(camera: Camera): Layer {
    return function drawCameraRect(
        context: CanvasRenderingContext2D,
        fromCamera: Camera
    ) {
        context.strokeStyle = "purple";
        context.rect(
            camera.position.x - fromCamera.position.x,
            camera.position.y - fromCamera.position.y,
            camera.size.x,
            camera.size.y
        );
        context.stroke();
    };
}
