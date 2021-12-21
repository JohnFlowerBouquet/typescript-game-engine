import Entity from "../Entity";
import { loadSpriteSheet } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import Killable from "../traits/Killable";
import PendulumWalk from "../traits/PendulumWalk";
import Trait from "../traits/Trait";

class Behavior extends Trait {
    constructor() {
        super("behavior");
    }

    public collides(entity: Entity, collidingEntity: Entity): void {
        const killableTrait = entity.trait("killable") as Killable;
        if (killableTrait.isDead) {
            return;
        }
        const pendulumWalk = entity.trait("pendulumWalk") as PendulumWalk;
        if (collidingEntity.hasTrait("stomper")) {
            if (collidingEntity.velocity.y > entity.velocity.y) {
                pendulumWalk.enabled = false;
                killableTrait.kill(entity);
            } else {
                const collidingKillableTrait = collidingEntity.trait("killable") as Killable;
                collidingKillableTrait.kill();
            }
        }
    }
}

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const isFlipped = false;
    const walkAnimation = entity.animations.get("walk");

    const killableTrait = entity.trait("killable") as Killable;
    if (killableTrait.isDead) {
        return {
            frameName: "flat",
            isFlipped
        }
    }
    return {
        frameName: walkAnimation ? walkAnimation(entity.lifeTime) : "",
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
        goomba.addTrait(new PendulumWalk());
        goomba.addTrait(new Behavior());
        goomba.addTrait(new Killable());
    return goomba;
    }
}