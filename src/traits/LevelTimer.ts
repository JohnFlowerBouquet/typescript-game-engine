import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import Trait from "./Trait";

export default class LevelTimer extends Trait {
    static EVENT_TIMER_HURRY = Symbol("hurryTime");
    static EVENT_TIMER_OK = Symbol("okTime");
    private totalTime = 300;
    private _currentTime = 300;
    private _hurryTime = 100;
    private _hurryEmitted = false;

    public get currentTime() {
        return this._currentTime;
    }

    constructor() {
        super('levelTimer');
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        this._currentTime -= gameContext.deltaTime * 2;
        if (!this._hurryEmitted && this._currentTime < this._hurryTime) {
            level.events.emit(LevelTimer.EVENT_TIMER_HURRY);
            this._hurryEmitted = true;
        }
        if (this._hurryEmitted && this._currentTime > this._hurryTime) {
            level.events.emit(LevelTimer.EVENT_TIMER_OK);
            this._hurryEmitted = true;
        }
    }
}