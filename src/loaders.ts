import { TILE_SIZE } from "./globals";
import { LevelMap, LevelMapRow, Position } from "./interface";
import { createBackgroundLayer, createSpriteLayer } from "./layers";
import Level from "./Level";
import SpriteSheet from "./spritesheet";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.src = url;
    });
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

function loadSpriteSheet(name: string): Promise<SpriteSheet> {
    return loadJSON<SpriteSheetConfiguration>(`/sprites/${name}.json`)
        .then((spriteSheetConfig) =>
            Promise.all([spriteSheetConfig, loadImage(spriteSheetConfig.url)])
        )
        .then(([spriteSheetConfig, image]) => {
            const sprites = new SpriteSheet(
                image,
                spriteSheetConfig.width,
                spriteSheetConfig.height
            );
            spriteSheetConfig.sprites.forEach((tileSpec) => {
                sprites.defineTile(
                    tileSpec.name,
                    tileSpec.position.x,
                    tileSpec.position.y
                );
            });
            return sprites;
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

function loadJSON<T>(url: string): Promise<T> {
    return fetch(url).then((level) => level.json());
}

interface SpriteSheetConfiguration {
    url: string;
    width: number;
    height: number;
    sprites: { name: string; position: Position }[];
}
