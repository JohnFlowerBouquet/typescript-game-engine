import Camera from "../Camera";
import { Font } from "../font";
import Level from "../Level";
import { findPlayers } from "../player";
import LevelTimer from "../traits/LevelTimer";
import Player from "../traits/Player";
import { Layer } from "./layer.interface";

function getPlayerTrait(level: Level) {
    for (const player of findPlayers(level)) {
        const playerTrait = player.trait("player") as Player;
        return playerTrait;
    }
}

function getLevelTimerTrait(level: Level) {
    for (const entity of level.entities) {
        if (entity.hasTrait("levelTimer")) {
            return entity.trait("levelTimer") as LevelTimer;
        }
    }
}

export function createDashboardLayer(font: Font, level: Level): Layer {
    const LINE1 = font.size;
    const LINE2 = font.size * 2;

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        const playerTrait = getPlayerTrait(level);
        const levelTimerTrait = getLevelTimerTrait(level);

        if (playerTrait && levelTimerTrait) {

            font.print(playerTrait.playerName, context, 16, LINE1);
            font.print(playerTrait.score.toString().padStart(6, '0'), context, 16, LINE2);

            font.print("x" + playerTrait.coins.toString().padStart(2, '0'), context, 96, LINE2);

            font.print("WORLD", context, 152, LINE1);
            font.print(`1-${level.name}`, context, 160, LINE2);

            font.print("TIME", context, 208, LINE1);
            
            font.print(levelTimerTrait.currentTime.toFixed().toString().padStart(3, '0'), context, 208, LINE2);
        }
    }
}