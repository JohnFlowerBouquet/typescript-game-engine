import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import { loadSpriteSheet } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import Gravity from "../traits/Gravity";
import Killable from "../traits/Killable";
import Solid from "../traits/Solid";
import Trait from "../traits/Trait";
import Velocity from "../traits/Velocity";

class Behavior extends Trait {
    private _gravity = new Gravity();
    constructor() {
        super("behavior");
    }

    public collides(entity: Entity, collidingEntity: Entity): void {
        const killableTrait = entity.trait("killable") as Killable;
        if (killableTrait.isDead) {
            return;
        }
        if (collidingEntity.hasTrait("stomper")) {
            if (collidingEntity.velocity.y > entity.velocity.y) {
                killableTrait.kill(entity);
                entity.velocity.set(100, -200);
            } else {
                const collidingKillableTrait = collidingEntity.trait("killable") as Killable;
                collidingKillableTrait.kill(collidingEntity);
            }
        }
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        const killableTrait = entity.trait("killable") as Killable;
        if (killableTrait.isDead) {
            this._gravity.update(entity, gameContext, level);
        }
    }
}

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const isFlipped = entity.velocity.x < 0;

    return {
        frameName: "bullet",
        isFlipped
    }
}

export function loadBullet(): Promise<() => Entity> {
    return loadSpriteSheet("bullet").then(sprite => createBulletFactory(sprite))
}

function createBulletFactory(sprite: SpriteSheet): () => Entity {
    return function createBullet() {
        const bullet = new Entity(sprite, drawFunction);
        bullet.size.set(16, 14);
        bullet.velocity.set(-40, 0);
        bullet.addTrait(new Solid());
        bullet.addTrait(new Behavior());
        bullet.addTrait(new Killable());
        bullet.addTrait(new Velocity())
        
    return bullet;
    }
}