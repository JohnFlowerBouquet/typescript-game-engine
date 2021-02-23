import { LevelMap, LevelMapRow } from "./interface";
import { createBackgroundLayer, createSpriteLayer } from "./layers";
import Level from "./Level";
import { loadBackgroundSprites } from "./sprites";
import SpriteSheet from "./spritesheet";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image))
      image.src = url;
    })
}

export function loadLevel(name: string): Promise<Level> {
  return Promise.all([
    loadLevelMap(name),
    loadBackgroundSprites(),
  ])
  .then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.map);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.compositor.addLayer(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.compositor.addLayer(spriteLayer);
    return level;
  })
}

function createTiles(level: Level, backgrounds: LevelMapRow[]): void {
  backgrounds.forEach((row, y) => {
    row.forEach((tile, x) => level.tiles.set(x, y, {name: tile}))
  });
}

function loadLevelMap(name: string): Promise<LevelMap> {
  return fetch(`/levels/${name}.json`).then(level => level.json());
}