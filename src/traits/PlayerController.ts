import Entity from "../Entity";
import Level from "../Level";
import { Vector } from "../vectors";
import Killable from "./Killable";
import Trait from "./Trait";

export default class PlayerController extends Trait {
    private _player?: Entity;
    private _checkpoint = new Vector(0, 0);

    constructor() {
        super('playerController');
    }

    public setPlayer(entity: Entity): void {
        this._player = entity;
    }

    public setCheckpoint(x: number, y: number): void {
        this._checkpoint.set(x, y);
    }

    public update(entity: Entity, deltaTime: number, level: Level): void {
        if (this._player && !level.entities.has(this._player)) {
            const killableTrait = this._player.trait("killable") as Killable;
            killableTrait.revive();
            this._player.position.set(this._checkpoint.x, this._checkpoint.y);
            level.entities.add(this._player);
        }
    }
}