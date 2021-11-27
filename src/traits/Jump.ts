import Entity from "../Entity";
import Trait from "./Trait";

export default class Jump extends Trait {
    private _duration = 0.5;
    private _velocity = 200;
    private _engageTime = 0;
    private _ready = false;

    public get ready() {
        return this._ready;
    }

    constructor() {
        super('jump');
    }

    public start(): void {
        if (this.ready) {
            this._engageTime = this._duration;
        }
    }

    public cancel(): void {
        this._engageTime = 0;
    }

    public obstruct(entity: Entity, side: string): void {
        if (side === "bottom") {
            this._ready = true;
        }
    }

    public update(entity: Entity, deltaTime: number): void {
        if (this._engageTime > 0) {
            entity.velocity.y = -this._velocity;
            this._engageTime -= deltaTime;
        }
        this._ready = false;
    }
}