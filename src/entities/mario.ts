import Entity from "../Entity";
import { loadSpriteSheet } from "../loaders";
import Jump from "../traits/Jump";
import Walk from "../traits/Walk";
import { getAnimationFrame } from "../utils/getAnimationFrame";

const frames = ["run-1", "run-2", "run-3"];

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const walkTrait = entity.trait("walk") as Walk;
    const jumpTrait = entity.trait("jump") as Jump;
    const isFlipped = walkTrait.heading < 0;
    if (!jumpTrait.ready) {
        return {
            frameName: "jump",
            isFlipped
        };
    }
    if (walkTrait.distance > 0) {
        if ((entity.velocity.x > 0 && walkTrait.direction < 0) || (entity.velocity.x < 0 && walkTrait.direction > 0)) {
            return {
                frameName: "break",
                isFlipped
            };
        }
        const runAnimation = getAnimationFrame(frames, 10);
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