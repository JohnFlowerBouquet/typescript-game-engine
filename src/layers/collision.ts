import Camera from "../Camera";
import Entity from "../Entity";
import { TILE_SIZE } from "../globals";
import Level from "../Level";
import Matrix from "../Matrix";
import TileCollider from "../TileCollider";
import { Layer } from "./layer.interface";

export function createCollisionLayer(level: Level): Layer {
    const entityCollisionLayer = createEntityCollisionLayer(level.entities);
    const tileCollisionLayer = createTileCollisionLayer(level.tileCollider);

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        entityCollisionLayer(context, camera);
        tileCollisionLayer(context, camera);
    };
}

function createEntityCollisionLayer(entities: Set<Entity>): Layer {
    return (context: CanvasRenderingContext2D, camera: Camera) => {
        context.strokeStyle = "yellow";
        entities.forEach((entity) => {
            context.beginPath();
            context.rect(
                entity.hitBox.left - camera.position.x,
                entity.hitBox.top - camera.position.y,
                entity.size.x - entity.offset.x,
                entity.size.y - entity.offset.y
            );
            context.stroke();
        });
    };
}

function createTileCollisionLayer(tileCollider: TileCollider): Layer {
    const tileResolver = tileCollider.tiles;
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

    return (context: CanvasRenderingContext2D, camera: Camera) => {
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

        resolvedTiles.clear();
    };
}
