import { LevelMap } from "./interface";

export function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise(resolve => {
      const image = new Image();
      image.addEventListener('load', () => resolve(image))
      image.src = url;
    })
}

export function loadLevel(name: string): Promise<LevelMap> {
    return fetch(`/levels/${name}.json`).then(level => level.json());
}