import Entity from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import Trait from "./Trait";

 export type Condition = (entity: Entity, collidingEntity: Set<Entity>, gameContext: GameContext, level: Level) => void

export default class Trigger extends Trait {
    private readonly _collidedEntities = new Set<Entity>();
    private readonly _conditions: Condition[] = [];

    constructor() {
        super('trigger');
    }

    public addCondition(condition: Condition): void {
        this._conditions.push(condition);
    }

    public collides(entity: Entity, collidingEntity: Entity): void {
        this._collidedEntities.add(collidingEntity);
    }

    public update(entity: Entity, gameContext: GameContext, level: Level): void {
        if (this._collidedEntities.size > 0) {
            for (const condition of this._conditions) {
                condition(entity, this._collidedEntities, gameContext, level);
            }
            this._collidedEntities.clear();
        }
    }

}