import Entity from "../Entity";
import { GameContext } from "../interface";
import Killable from "./Killable";
import Trait from "./Trait";

export default class Stomper extends Trait {
    private _speed = 400;
    private _stomped = false;

    constructor() {
        super('stomper');
    }

    public collides(entity: Entity, collidingEntity: Entity): void {
        const killableTrait = collidingEntity.trait("killable") as Killable;
        if (!killableTrait || killableTrait.isDead ) {
            return;
        }

        if (entity.velocity.y > collidingEntity.velocity.y) {
            this._bounce(entity, collidingEntity);
            this._stomped = true;
        }
    }

    public update(entity: Entity, gameContext: GameContext): void {
        if (this._stomped) {
            gameContext.audioBoard.playAudio("stomp");
            this._stomped = false;
        }
    }

    private _bounce(entity: Entity, collidingEntity: Entity): void {
        entity.hitBox.bottom = collidingEntity.hitBox.top;
        entity.velocity.y = -this._speed;
    }
}