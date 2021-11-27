import Entity from "../Entity";
import Trait from "./Trait";

export default class Walk extends Trait {
    private _direction = 0;
    private _speed = 5000;
    private _distance = 0;
    private _heading = 1;

    constructor() {
        super('walk');
    }

    public get direction(): number {
        return this._direction;
    }

    public get distance(): number {
        return this._distance;
    }

    public get heading(): number {
        return this._heading;
    }

    public update(entity: Entity, deltaTime: number): void {
        entity.velocity.x = this._speed * this._direction * deltaTime;

        if (this._direction) {
            this._heading = this._direction;
            this._distance += Math.abs(entity.velocity.x) * deltaTime;
        } else {
            this._distance = 0;
        }
    }

    public start(direction: number): void {
        this._direction += direction;
    }
}