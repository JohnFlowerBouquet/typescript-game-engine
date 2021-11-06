import Entity from "../Entity";
import Trait from "./Trait";

export default class Walk extends Trait {
    private direction = 0;
    private speed = 2000;
    constructor() {
        super('walk');
    }

    public update(entity: Entity, deltaTime: number): void {
        entity.velocity.x = this.speed * this.direction * deltaTime;
    }

    public start(direction: number): void {
        this.direction = direction;
    }
}