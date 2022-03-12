import Entity from "../Entity";
import Killable from "./Killable";
import Trait from "./Trait";

export default class Stomper extends Trait {
    static EVENT_STOMP = Symbol("stomp");
    private _speed = 400;

    constructor() {
        super('stomper');
    }

    public collides(entity: Entity, collidingEntity: Entity): void {
        if (collidingEntity.hasTrait("killeable")) {
            const killableTrait = collidingEntity.trait("killable") as Killable;
            if (killableTrait.isDead) return;
        } else {
            return;
        }

        if (entity.velocity.y > collidingEntity.velocity.y) {
            this.queue(() => this._bounce(entity, collidingEntity));
            entity.events.emit(Stomper.EVENT_STOMP, entity, collidingEntity);
            entity.playSound("stomp");
        }
    }

    private _bounce(entity: Entity, collidingEntity: Entity): void {
        entity.hitBox.bottom = collidingEntity.hitBox.top;
        entity.velocity.y = -this._speed;
    }
}