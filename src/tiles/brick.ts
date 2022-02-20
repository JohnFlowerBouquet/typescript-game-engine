import Entity, { Side } from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import TileResolver, { TileWithIndex } from "../TileResolver";

function handleX(entity: Entity, match: TileWithIndex, tileResolver: TileResolver, gameContext: GameContext, level: Level): void {
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

function handleY(entity: Entity, match: TileWithIndex, tileResolver: TileResolver, gameContext: GameContext, level: Level): void {
    if (entity.velocity.y > 0) {
        if (entity.hitBox.bottom > match.y1) {
            entity.obstruct(Side.bottom, match);
        }
    } else if (entity.velocity.y < 0) {
        if (entity.hitBox.top  < match.y2) {
            entity.obstruct(Side.top, match);
            tileResolver.matrix.remove(match.indexX, match.indexY);
            const goomba = gameContext.entityFactory.goomba();
            goomba.velocity.set(100, -400);
            goomba.position.set(match.x1, match.y1);
            level.entities.add(goomba);
        }
    }
};

export const bricks = [handleX, handleY];