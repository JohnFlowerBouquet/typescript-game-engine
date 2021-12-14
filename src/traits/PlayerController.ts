import Entity from "../Entity";
import Level from "../Level";
import Killable from "./Killable";
import Trait from "./Trait";

export default class PlayerController extends Trait {
    private _player?: Entity;

    constructor() {
        super('playerController');
    }

    public setPlayer(entity: Entity): void {
        this._player = entity;
    }

    public update(entity: Entity, deltaTime: number, level: Level): void {
        if (this._player && !level.entities.has(this._player)) {
            const killableTrait = this._player.trait("killable") as Killable;
            killableTrait.revive();
            this._player.position.set(64, 64);
            level.entities.add(this._player);
        }
    }
}