import Entity, { Side } from "../Entity";
import Trait from "./Trait";

export default class Jump extends Trait {
    private _duration = 0.3;
    private _velocity = 200;
    private _engageTime = 0;
    private _requestTime = 0;
    private _ready = 0;
    private _gracePeriod = 0.5;

    public get falling() {
        return this._ready < 0;
    }

    constructor() {
        super('jump');
    }

    public start(): void {
        this._requestTime = this._gracePeriod;
    }

    public cancel(): void {
        this._engageTime = 0;
        this._requestTime = 0;
    }

    public obstruct(entity: Entity, side: Side): void {
        if (side === Side.bottom) {
            this._ready = 1;
        } else if (side === Side.top) {
            this.cancel();
        }
    }

    public update(entity: Entity, deltaTime: number): void {
        if (this._requestTime > 0) {
            if (this._ready > 0) {
                this._engageTime = this._duration;
                this._requestTime = 0;
            }
            this._requestTime -= deltaTime;
        }
        if (this._engageTime > 0) {
            entity.velocity.y = -this._velocity;
            this._engageTime -= deltaTime;
        }
        this._ready--;
    }
}