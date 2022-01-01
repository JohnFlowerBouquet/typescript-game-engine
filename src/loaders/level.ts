import { TILE_SIZE } from "../globals";
import { createBackgroundLayer } from "../layers/background";
import { createSpriteLayer } from "../layers/sprites";
import Level from "../Level";
import { loadJSON, loadSpriteSheet } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import { EntityFactory } from "./entities";

export type LevelMapRow = string[];

interface LevelMap {
    spriteSheet: string;
    map: LevelMapRow[];
    entities: {
        name: string;
        position: [number, number]
    }[]
}

export function createLevelLoader(
    entityFactory: EntityFactory
): (name: string) => Promise<Level> {
    return function loadLevel(name: string): Promise<Level> {
        return loadJSON<LevelMap>(`/levels/${name}.json`)
            .then((levelSpec) =>
                Promise.all([levelSpec, loadSpriteSheet(levelSpec.spriteSheet)])
            )
            .then(([levelSpec, backgroundSprites]) => {
                const level = new Level();

                createTiles(level, levelSpec.map);

                setupBackgrounds(level, backgroundSprites);

                setupEntities(level, levelSpec, entityFactory);

                return level;
            });
    };
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

function setupBackgrounds(level: Level, backgroundSprites: SpriteSheet): void {
    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.compositor.addLayer(backgroundLayer);
}

function setupEntities(level: Level, levelSpec: LevelMap, entityFactory: EntityFactory): void {
    const spriteLayer = createSpriteLayer(level.entities);
    level.compositor.addLayer(spriteLayer);

    levelSpec.entities.forEach(entitySpec => {
        const entity = entityFactory[entitySpec.name]();
        entity.position.set(entitySpec.position[0], entitySpec.position[1]);
        level.entities.add(entity);
    })
}
