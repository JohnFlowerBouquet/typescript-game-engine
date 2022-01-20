import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import Trait from "./Trait";

type EmitterFunc = (entity: Entity, level: Level) => void;

export default class Emitter extends Trait {
    private _interval = 2;
    private _coolDown = this._interval;
    private _emitters: EmitterFunc[] = [];

    constructor() {
        super("emitter");
    }

    public addEmitter(emitter: EmitterFunc): void {
        this._emitters.push(emitter);
    }

    public emit(entity: Entity, level: Level): void {
        this._emitters.forEach(emitter => emitter(entity, level))
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        this._coolDown -= gameContext.deltaTime;
        if (this._coolDown <= 0) {
            this.emit(entity, level);
            this._coolDown = this._interval;
        }
    }
}