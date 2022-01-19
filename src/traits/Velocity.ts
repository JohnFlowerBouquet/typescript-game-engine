import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import Trait from "./Trait";

export default class Velocity extends Trait {

    constructor() {
        super('velocity');
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        entity.position.x += entity.velocity.x * gameContext.deltaTime;
        entity.position.y += entity.velocity.y * gameContext.deltaTime;
    }
}