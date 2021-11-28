import Entity, { Side } from "../Entity";
import Trait from "./Trait";

export default class Jump extends Trait {
    private _duration = 0.5;
    private _velocity = 200;
    private _engageTime = 0;
    private _ready = 0;

    public get falling() {
        return this._ready < 0;
    }

    constructor() {
        super('jump');
    }

    public start(): void {
        if (this._ready > 0) {
            this._engageTime = this._duration;
        }
    }

    public cancel(): void {
        this._engageTime = 0;
    }

    public obstruct(entity: Entity, side: Side): void {
        if (side === Side.bottom) {
            this._ready = 1;
        } else if (side === Side.top) {
            this.cancel();
        }
    }

    public update(entity: Entity, deltaTime: number): void {
        if (this._engageTime > 0) {
            entity.velocity.y = -this._velocity;
            this._engageTime -= deltaTime;
        }
        this._ready--;
    }
}