import Entity from "../Entity";
import Trait from "./Trait";

export default class Walk extends Trait {
    private _direction = 0;
    private _acceleration = 400;
    private _deceleration = 300;
    private _distance = 0;
    private _heading = 1;
    private _dragFactor = 1/5000;

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
        const absoluteX = Math.abs(entity.velocity.x);
        if (this._direction !== 0) {
            entity.velocity.x += this._acceleration * this._direction * deltaTime;
            this._heading = this._direction;
            this._distance += absoluteX * deltaTime;
        } else if (entity.velocity.x !== 0) {
            const deceleration = Math.min(absoluteX, this._deceleration * deltaTime);
            entity.velocity.x += entity.velocity.x > 0 ? -deceleration : deceleration;
        } else {
            this._distance = 0;
        }

        const drag = this._dragFactor * entity.velocity.x * absoluteX;
        entity.velocity.x -= drag;

        this._distance += absoluteX * deltaTime;
    }

    public start(direction: number): void {
        this._direction += direction;
    }
}