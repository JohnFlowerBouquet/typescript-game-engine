import Entity from "../Entity";
import { GameContext } from "../interface";
import { loadSpriteSheet } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import Killable from "../traits/Killable";
import PendulumWalk from "../traits/PendulumWalk";
import Physics from "../traits/Physics";
import Solid from "../traits/Solid";
import Trait from "../traits/Trait";

enum KoopaState {
    walking,
    hiding
}

class Behavior extends Trait {
    public hidingTime = 0;
    
    private _state = KoopaState.walking
    private _hidingDuration = 5;
    private _rollingSpeed = 300;

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
                this.handleStomp(entity, collidingEntity);
            } else {
                this.handleNudge(entity, collidingEntity);                
            }
        }
    }

    public handleNudge(entity: Entity, nudgingEntity: Entity): void {
        if (this._state === KoopaState.walking) {
            const collidingKillableTrait = nudgingEntity.trait("killable") as Killable;
            collidingKillableTrait.kill(nudgingEntity);
        } else {
            const pendulumWalk = entity.trait("pendulumWalk") as PendulumWalk;
            pendulumWalk.enabled = true;
            pendulumWalk.speed = this._rollingSpeed * Math.sign(nudgingEntity.velocity.x);
            const killableTrait = entity.trait("killable") as Killable;
            killableTrait.kill(entity);
        }
    }

    public handleStomp(entity: Entity, stompingEntity: Entity): void {
        if (this._state === KoopaState.walking) {
            this.hide(entity);
        } else if (this._state === KoopaState.hiding) {
            const pendulumWalk = entity.trait("pendulumWalk") as PendulumWalk;
            pendulumWalk.enabled = true;
            pendulumWalk.speed = this._rollingSpeed * Math.sign(stompingEntity.velocity.x);
            const killableTrait = entity.trait("killable") as Killable;
            killableTrait.kill(entity);
        }
    }

    public hide(entity: Entity): void {
        entity.velocity.x = 0;
        const pendulumWalk = entity.trait("pendulumWalk") as PendulumWalk;
        pendulumWalk.enabled = false;
        this._state = KoopaState.hiding;
        this.hidingTime = 0;
    }

    public reveal(entity: Entity): void {
        const pendulumWalk = entity.trait("pendulumWalk") as PendulumWalk;
        pendulumWalk.enabled = true;
        this._state = KoopaState.walking;
    }

    public isHiding(): boolean {
        return this._state === KoopaState.hiding;
    }

    public update(entity: Entity, gameContext: GameContext): void {
        if (this._state === KoopaState.hiding) {
            this.hidingTime += gameContext.deltaTime;
            if (this.hidingTime > this._hidingDuration) {
                this.reveal(entity);
            }
        }
    }
}

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const isFlipped = entity.velocity.x < 0;
    const walkAnimation = entity.animations.get("walk");
    const wakeAnimation = entity.animations.get("wake");

    const killableTrait = entity.trait("behavior") as Behavior;
    if (killableTrait.isHiding()) {
        if (killableTrait.hidingTime > 3) {
            return {
                frameName: wakeAnimation ?  wakeAnimation(entity.lifeTime) : "",
                isFlipped
            }
        }
        return {
            frameName: "hiding",
            isFlipped
        }
    }
    return {
        frameName: walkAnimation ? walkAnimation(entity.lifeTime) : "",
        isFlipped
    };
}

export function loadKoopa(): Promise<() => Entity> {
    return loadSpriteSheet("koopa").then(sprite => createKoopaFactory(sprite))
}

function createKoopaFactory(sprite: SpriteSheet): () => Entity {
    return function createKoopa() {
        const koopa = new Entity(sprite, drawFunction);
        koopa.size.set(16, 24);
        koopa.offset.y = 8;
        koopa.addTrait(new Physics());
        koopa.addTrait(new Solid());
        koopa.addTrait(new PendulumWalk());
        koopa.addTrait(new Behavior());
        koopa.addTrait(new Killable());

    return koopa;
    }
}