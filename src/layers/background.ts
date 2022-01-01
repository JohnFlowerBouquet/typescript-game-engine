import Camera from "../Camera";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../index";
import Level from "../Level";
import SpriteSheet from "../SpriteSheet";
import { getCanvasWithContext } from "../utils/getCanvasWithContext";
import { Layer } from "./layer.interface";

export function createBackgroundLayer(
    level: Level,
    sprites: SpriteSheet
): Layer {
    const resolver = level.tileCollider.tiles;

    const { canvas, context } = getCanvasWithContext(
        CANVAS_WIDTH,
        CANVAS_HEIGHT
    );

    let startIndex: number, endIndex: number;

    function reDraw(drawFrom: number, drawTo: number) {
        // Optimization: Redraw background only when position changed
        // Turned of due to unable running animated frames
        // if (drawFrom === startIndex && drawTo === endIndex) {
        //     return;
        // }
        startIndex = drawFrom;
        endIndex = drawTo;
        
        for (let x = drawFrom; x <= drawTo; ++x) {
            const col = level.tiles.grid[x];
            if (col) {
                col.forEach((tile, y) => {
                    if (sprites.animations.has(tile.name)) {
                        sprites.drawAnimation(tile.name, context, x - drawFrom, y, level.totalTime);
                    } else {
                        sprites.drawTile(tile.name, context, x - drawFrom, y);
                    }
                });
            }
        }
    }

    return (contextParam: CanvasRenderingContext2D, camera: Camera) => {
        const drawWidth = resolver.toIndex(camera.size.x);
        const drawFrom = resolver.toIndex(camera.position.x);
        const drawTo = drawFrom + drawWidth;
        reDraw(drawFrom, drawTo);

        contextParam.drawImage(canvas, -camera.position.x % 16, -camera.position.y);
    }
}