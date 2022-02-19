import Entity, { Side } from "../Entity";
import TileResolver, { TileWithIndex } from "../TileResolver";

function handleX(entity: Entity, match: TileWithIndex): void {
    if (entity.velocity.x > 0) {
        if (entity.hitBox.right > match.x1) {
            entity.obstruct(Side.right, match);
        }
    } else if (entity.velocity.x < 0) {
        if (entity.hitBox.left < match.x2) {
            entity.obstruct(Side.left, match);
        }
    }
};

function handleY(entity: Entity, match: TileWithIndex, tileResolver: TileResolver): void {
    if (entity.velocity.y > 0) {
        if (entity.hitBox.bottom > match.y1) {
            entity.obstruct(Side.bottom, match);
        }
    } else if (entity.velocity.y < 0) {
        if (entity.hitBox.top  < match.y2) {
            entity.obstruct(Side.top, match);
            tileResolver.matrix.remove(match.indexX, match.indexY);
        }
    }
};

export const bricks = [handleX, handleY];