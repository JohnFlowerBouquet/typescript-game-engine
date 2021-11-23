import Entity from "../Entity";
import { loadSpriteSheet } from "../loaders";
import Jump from "../traits/Jump";
import Walk from "../traits/Walk";

const frames = ["run-1", "run-2", "run-3"];

function createAnimation(frames: string[], frameLength: number) {
    return (distance: number) => {
        const frameIndex = Math.floor(distance / frameLength) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
    };
}

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const walkTrait = entity.trait("walk") as Walk;
    const isFlipped = walkTrait.heading < 0;
    if (walkTrait.direction !== 0) {
        const runAnimation = createAnimation(frames, 10);
        return {
            frameName: runAnimation(walkTrait.distance),
            isFlipped
        }
    } else {
        return {
            frameName: "idle",
            isFlipped
        };
    }
}

export function createMario(): Promise<Entity> {
    return loadSpriteSheet("mario").then(sprite => {
        const mario = new Entity(sprite, drawFunction);
        mario.size.set(16, 16);
        mario.addTrait(new Walk());
        mario.addTrait(new Jump());
        mario.position.set(64, 64);

        return mario;
    })
}