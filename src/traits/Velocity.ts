import Entity from "../Entity";
import Trait from "./Trait";

export default class Velocity extends Trait {
    constructor() {
        super('velocity');
    }

    public update(entity: Entity, deltaTime: number): void {
        entity.position.x += entity.velocity.x * deltaTime;
        entity.position.y += entity.velocity.y * deltaTime;
    }
}