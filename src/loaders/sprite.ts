import { loadImage, loadJSON } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import { getAnimationFrame } from "../utils/getAnimationFrame";
import { Position, Animation } from "../interface";

interface Frame {
    name: string;
    rect: [number, number, number, number];
}

interface SpriteSheetConfiguration {
    url: string;
    width: number;
    height: number;
    sprites: { name: string; position: Position }[];
    frames?: Frame[],
    animations?: Animation[]
}


export function loadSpriteSheet(name: string): Promise<SpriteSheet> {
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

            if (spriteSheetConfig.sprites) {
                spriteSheetConfig.sprites.forEach((tileSpec) => {
                    sprites.defineTile(
                        tileSpec.name,
                        tileSpec.position.x,
                        tileSpec.position.y
                    );
                });
            }

            if (spriteSheetConfig.frames) {
                spriteSheetConfig.frames.forEach(frameSpec => {
                    sprites.define(frameSpec.name, ...frameSpec.rect);
                })
            }

            if (spriteSheetConfig.animations) {
                spriteSheetConfig.animations.forEach(animationSpec => {
                    const animationFrame = getAnimationFrame(animationSpec.frames, animationSpec.frameLength);
                    sprites.defineAnimation(animationSpec.name, animationFrame);
                })
            }
            
            return sprites;
        });
}