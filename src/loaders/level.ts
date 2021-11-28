import { TILE_SIZE } from "../globals";
import { createBackgroundLayer, createSpriteLayer } from "../layers";
import Level from "../Level";
import { loadJSON, loadSpriteSheet } from "../loaders";

export type LevelMapRow = string[];

interface LevelMap {
    spriteSheet: string;
    map: LevelMapRow[];
}

export function loadLevel(name: string): Promise<Level> {
    return loadJSON<LevelMap>(`/levels/${name}.json`)
        .then((levelSpec) =>
            Promise.all([levelSpec, loadSpriteSheet(levelSpec.spriteSheet)])
        )
        .then(([levelSpec, backgroundSprites]) => {
            const level = new Level();

            createTiles(level, levelSpec.map);

            const backgroundLayer = createBackgroundLayer(
                level,
                backgroundSprites
            );
            level.compositor.addLayer(backgroundLayer);

            const spriteLayer = createSpriteLayer(level.entities);
            level.compositor.addLayer(spriteLayer);
            return level;
        });
}

function createTiles(level: Level, backgrounds: LevelMapRow[]): void {
    backgrounds.forEach((row, y) => {
        row.forEach((tile, x) =>
            level.tiles.set(x, y, {
                name: tile,
                x1: x,
                x2: x + TILE_SIZE.width,
                y1: y,
                y2: y + TILE_SIZE.height,
            })
        );
    });
}