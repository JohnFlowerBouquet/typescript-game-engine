import Entity, { Side } from "../Entity";
import Trait from "./Trait";

export default class PendulumWalk extends Trait {
    constructor(private _speed: number = 30) {
        super('pendulumWalk');
    }

    public set speed(speed: number) {
        this._speed = speed;
    }

    public update(entity: Entity, deltaTime: number): void {
        entity.velocity.x = this._speed;
    }

    public obstruct(entity: Entity, side: Side): void {
        if (side === Side.left || side === Side.right) {
            this._speed = -this._speed;
        }
    }
}