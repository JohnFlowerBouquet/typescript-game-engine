import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import { Vector } from "../vectors";
import Killable from "./Killable";
import Stomper from "./Stomper";
import Trait from "./Trait";

export default class PlayerController extends Trait {
    private _player?: Entity;
    private _checkpoint = new Vector(0, 0);
    private _time = 300;
    private _score = 0;

    public get score(): number {
        return this._score;
    }

    public get time(): number {
        return this._time;
    }

    constructor() {
        super('playerController');
    }

    public setPlayer(entity: Entity): void {
        this._player = entity;
        const stomperTrait = this._player.trait("stomper") as Stomper;
        stomperTrait.events.listen("stomp", () => {
            this._score += 100;
        })
        
    }

    public setCheckpoint(x: number, y: number): void {
        this._checkpoint.set(x, y);
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        if (this._player && !level.entities.has(this._player)) {
            const killableTrait = this._player.trait("killable") as Killable;
            killableTrait.revive();
            this._player.position.set(this._checkpoint.x, this._checkpoint.y);
            level.entities.add(this._player);
        } else {
            this._time -= gameContext.deltaTime;
        }
    }
}