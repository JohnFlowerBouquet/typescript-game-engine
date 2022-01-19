import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import Trait from "./Trait";

export default class Gravity extends Trait {

    constructor() {
        super('gravity');
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        entity.velocity.y += level.gravity * gameContext.deltaTime;
    }
}