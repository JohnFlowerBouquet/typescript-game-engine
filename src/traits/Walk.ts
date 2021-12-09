import Entity, { Side } from "../Entity";
import Jump from "./Jump";
import Trait from "./Trait";

export default class Walk extends Trait {
    private _direction = 0;
    private _acceleration = 400;
    private _deceleration = 300;
    private _distance = 0;
    private _heading = 1;
    private _dragFactor = 1/1000;
    private _speed = 1;
    private _obstructFunc?: (entity: Entity, side: Side) => void;

    constructor(speed?: number, obstructFunc?: (entity: Entity, side: Side) => void) {
        super('walk');
        this._obstructFunc = obstructFunc;
        this._speed = speed ? speed : this._speed;
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
            entity.velocity.x += this._acceleration * this._direction * deltaTime * this._speed;
            const jumpTrait = entity.trait("jump") as Jump;
            if (jumpTrait) {
                if (jumpTrait.falling === false) {
                    this._heading = this._direction;
                }
            } else {
                this._heading = this._direction;
            }
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

    public sprint(isOn: boolean): void {
        this._dragFactor = isOn ? 1/5000 : 1/1000;
    }

    public obstruct(entity: Entity, side: Side): void {
        if (this._obstructFunc) {
            this._obstructFunc(entity, side);
        }
    }
}