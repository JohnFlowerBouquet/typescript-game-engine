import Entity from "../Entity";
import { loadSpriteSheet } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import Jump from "../traits/Jump";
import Walk from "../traits/Walk";

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const walkTrait = entity.trait("walk") as Walk;
    const jumpTrait = entity.trait("jump") as Jump;
    const isFlipped = walkTrait.heading < 0;
    if (jumpTrait.falling) {
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

        const runAnimation = entity.animations.get("run");
        return {
            frameName: runAnimation ? runAnimation(walkTrait.distance) : "",
            isFlipped
        }
    } else {
        return {
            frameName: "idle",
            isFlipped
        };
    }
}

export function loadMario(): Promise<() => Entity> {
    return loadSpriteSheet("mario").then(sprite => createMarioFactory(sprite))
}

function createMarioFactory(sprite: SpriteSheet): () => Entity {
    return function createMario() {
        const mario = new Entity(sprite, drawFunction);
        mario.size.set(16, 16);
        mario.addTrait(new Walk());
        mario.addTrait(new Jump());
        mario.position.set(64, 64);

    return mario;
    }
}