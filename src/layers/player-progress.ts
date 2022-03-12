import Camera from "../Camera";
import { Font } from "../font";
import Level from "../Level";
import { findPlayers } from "../player";
import Player from "../traits/Player";
import { getCanvasWithContext } from "../utils/getCanvasWithContext";
import { Layer } from "./layer.interface";

function getPlayer(level: Level) {
    for (const player of findPlayers(level)) {;
        return player;
    }
}

export function createPlayerProgerssLayer(font: Font, level: Level): Layer {
    const size = font.size;
    const { canvas: spriteBuffer, context: spriteBufferContext } =
        getCanvasWithContext(32, 32);

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        const player = getPlayer(level);

        if (player) {           
            const playerTrait = player.trait("player") as Player
            font.print(`WORLD 1-${level.name}`, context, size * 12, size * 12);

            spriteBufferContext.clearRect(0, 0, spriteBuffer.width, spriteBuffer.height);
            player.draw(spriteBufferContext);

            context.drawImage(spriteBuffer, size * 13, size * 15 );

            font.print(`x ${playerTrait.lives}`, context, size * 16, size * 15.5);
        }
    }
}