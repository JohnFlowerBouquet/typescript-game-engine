import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import TileResolver, { TileWithIndex } from "../TileResolver";
import Player from "../traits/Player";

function handle(entity: Entity, match: TileWithIndex, tileResolver: TileResolver, gameContext: GameContext, level: Level): void {
    const playerTrait = entity.trait("player") as Player;
    if (playerTrait) {
        playerTrait.addCoins(1);
        entity.playSound("coin");
        const grid = tileResolver.matrix;
        grid.remove(match.indexX, match.indexY);
    }
};

export const coin = [handle, handle];