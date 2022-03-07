import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import Trait from "./Trait";

export default class LevelTimer extends Trait {
    static EVENT_TIMER_HURRY = Symbol("hurryTime");
    static EVENT_TIMER_OK = Symbol("okTime");
    private totalTime = 300;
    private currentTime = 300;
    private hurryTime = 100;
    private hurryEmitted = false;

    constructor() {
        super('levelTimer');
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        this.currentTime -= gameContext.deltaTime * 2;
        if (!this.hurryEmitted && this.currentTime < this.hurryTime) {
            level.events.emit(LevelTimer.EVENT_TIMER_HURRY);
            this.hurryEmitted = true;
        }
        if (this.hurryEmitted && this.currentTime > this.hurryTime) {
            level.events.emit(LevelTimer.EVENT_TIMER_OK);
            this.hurryEmitted = true;
        }
    }
}