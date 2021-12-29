import Entity from "../Entity";
import Level from "../Level";
import Trait from "./Trait";

export default class Killable extends Trait {
    public isDead = false;

    private _deadTime = 0;
    private _removeAfter = 2;

    constructor() {
        super('killable');
    }

    public kill(entity: Entity): void {
        entity.velocity.x = 0;
        this.queue(() => this.isDead = true)
    }

    public revive(): void {
        this.isDead = false;
    }

    public update(entity: Entity, deltaTime: number, level: Level): void {
        if (this.isDead) {
            this._deadTime += deltaTime;
            if (this._deadTime > this._removeAfter) {
                this.queue(() => level.entities.delete(entity));
            }
        }
    }
}