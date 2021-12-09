import Entity, { Side } from "../Entity";
import { loadSpriteSheet } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import Jump from "../traits/Jump";
import Walk from "../traits/Walk";

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const walkTrait = entity.trait("walk") as Walk;
    const jumpTrait = entity.trait("jump") as Jump;
    const isFlipped = walkTrait.heading < 0;
    const walkAnimation = entity.animations.get("walk");
    return {
        frameName: walkAnimation ? walkAnimation(walkTrait.distance) : "",
        isFlipped
    };
}

export function loadGoomba(): Promise<() => Entity> {
    return loadSpriteSheet("goomba").then(sprite => createGoombaFactory(sprite))
}

function createGoombaFactory(sprite: SpriteSheet): () => Entity {
    return function createGoomba() {
        const goomba = new Entity(sprite, drawFunction);
        goomba.size.set(16, 16);
        const obstructFunc = (entity: Entity, side: Side) => {
            if (side === Side.left || side === Side.right) {
                const walkTrait = entity.trait("walk") as Walk;
                if ( walkTrait.direction < 0) {
                    walkTrait.start(-walkTrait.direction + 1);
                    entity.velocity.x = 30;
                } else {
                    walkTrait.start(-walkTrait.direction - 1);
                    entity.velocity.x = -30;;
                }
            }
        }
        const walkTrait = new Walk(0.5, obstructFunc);
        walkTrait.start(-1);
        goomba.addTrait(walkTrait);
        goomba.addTrait(new Jump());
        goomba.position.set(128, 64);
        goomba.velocity.x = 30;

    return goomba;
    }
}