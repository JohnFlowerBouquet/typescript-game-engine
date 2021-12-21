import Entity from "../Entity";
import Trait from "./Trait";

export default class Stomper extends Trait {
    private _speed = 400;

    constructor() {
        super('stomper');
    }

    public collides(entity: Entity, collidingEntity: Entity): void {
        if (collidingEntity.hasTrait("killable") && entity.velocity.y > collidingEntity.velocity.y) {
            this._bounce(entity, collidingEntity);
        }
    }

    private _bounce(entity: Entity, collidingEntity: Entity): void {
        entity.hitBox.bottom = collidingEntity.hitBox.top;
        entity.velocity.y = -this._speed;
    }
}