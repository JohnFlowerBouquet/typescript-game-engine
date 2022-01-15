import Camera from "../Camera";
import Entity from "../Entity";
import { Font } from "../font";
import PlayerController from "../traits/PlayerController";
import { Layer } from "./layer.interface";

export function createDashboardLayer(font: Font, player: Entity): Layer {
    const LINE1 = font.size;
    const LINE2 = font.size * 2;

    const coins = 13;

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        const playerControllerTrait = player.trait("playerController") as PlayerController;
        
        font.print("MARIO", context, 16, LINE1);
        font.print(playerControllerTrait.score.toString().padStart(6, '0'), context, 16, LINE2);

        font.print("x" + coins.toString().padStart(2, '0'), context, 96, LINE2);

        font.print("WORLD", context, 152, LINE1);
        font.print("1-1", context, 160, LINE2);

        font.print("TIME", context, 208, LINE1);
        
        font.print(playerControllerTrait.time.toFixed().toString().padStart(3, '0'), context, 208, LINE2);
    }
}