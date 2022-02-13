import Entity from "../Entity";
import Killable from "./Killable";
import Trait from "./Trait";

export default class Stomper extends Trait {
    private _speed = 400;

    constructor() {
        super('stomper');
    }

    public collides(entity: Entity, collidingEntity: Entity): void {
        const killableTrait = collidingEntity.trait("killable") as Killable;
        if (!killableTrait || killableTrait.isDead ) {
            return;
        }

        if (entity.velocity.y > collidingEntity.velocity.y) {
            this.queue(() => this._bounce(entity, collidingEntity));
            this.events.emit("stomp", entity, collidingEntity);
            entity.playSound("stomp");
        }
    }

    private _bounce(entity: Entity, collidingEntity: Entity): void {
        entity.hitBox.bottom = collidingEntity.hitBox.top;
        entity.velocity.y = -this._speed;
    }
}