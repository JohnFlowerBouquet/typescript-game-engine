import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import Trait from "./Trait";

export default class Physics extends Trait {

    constructor() {
        super('physics');
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        entity.position.x += entity.velocity.x * gameContext.deltaTime;
        level.tileCollider.checkX(entity);

        entity.position.y += entity.velocity.y * gameContext.deltaTime;
        level.tileCollider.checkY(entity);

        entity.velocity.y += level.gravity * gameContext.deltaTime;
    }
}