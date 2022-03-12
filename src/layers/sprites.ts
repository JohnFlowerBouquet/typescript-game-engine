import Camera from "../Camera";
import Entity from "../Entity";
import { getCanvasWithContext } from "../utils/getCanvasWithContext";
import { Layer } from "./layer.interface";

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
                Math.floor(entity.position.x - camera.position.x),
                Math.floor(entity.position.y - camera.position.y)
            );
        });
}