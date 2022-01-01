import Camera from "../Camera";
import Entity from "../Entity";
import { Layer } from "../layers";
import { getCanvasWithContext } from "../utils/getCanvasWithContext";

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