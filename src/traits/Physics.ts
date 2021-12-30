import Entity from "../Entity";
import Level from "../Level";
import Trait from "./Trait";

export default class Physics extends Trait {

    constructor() {
        super('physics');
    }

    public update(entity: Entity, deltaTime: number, level: Level): void {
        entity.position.x += entity.velocity.x * deltaTime;
        level.tileCollider.checkX(entity);

        entity.position.y += entity.velocity.y * deltaTime;
        level.tileCollider.checkY(entity);

        entity.velocity.y += level.gravity * deltaTime;
    }
}