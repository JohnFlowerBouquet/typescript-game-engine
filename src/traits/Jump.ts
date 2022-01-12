import AudioBoard from "../AudioBoard";
import Entity, { Side } from "../Entity";
import Level from "../Level";
import Trait from "./Trait";

export default class Jump extends Trait {
    private _duration = 0.3;
    private _velocity = 200;
    private _engageTime = 0;
    private _requestTime = 0;
    private _ready = 0;
    private _gracePeriod = 0.5;
    private _speedBoost = 0.3;

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

    public update(entity: Entity, deltaTime: number, level: Level, audioBoard: AudioBoard): void {
        if (this._requestTime > 0) {
            if (this._ready > 0) {
                audioBoard.playAudio("jump");
                this._engageTime = this._duration;
                this._requestTime = 0;
            }
            this._requestTime -= deltaTime;
        }
        if (this._engageTime > 0) {
            entity.velocity.y = -(this._velocity + Math.abs(entity.velocity.x) * this._speedBoost);
            this._engageTime -= deltaTime;
        }
        this._ready--;
    }
}