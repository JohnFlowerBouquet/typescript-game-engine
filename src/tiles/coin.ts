import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import TileResolver, { TileWithIndex } from "../TileResolver";

function handle(entity: Entity, match: TileWithIndex, tileResolver: TileResolver, gameContext: GameContext, level: Level): void {
    if (entity.hasTrait("player")) {
        const grid = tileResolver.matrix;
        grid.remove(match.indexX, match.indexY);
    }
};

export const coin = [handle, handle];