import Entity from "../Entity";
import Trait from "./Trait";

export default class Stomper extends Trait {
    private _queueBounce = false;
    private _speed = 400;

    constructor() {
        super('stomper');
    }

    public bounce(): void {
        this._queueBounce = true;
    }

    public update(entity: Entity, deltaTime: number): void {
        if (this._queueBounce) {
            entity.velocity.y = -this._speed;
            this._queueBounce = false;
        }
    }
}