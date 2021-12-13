import Entity, { Side } from "../Entity";
import Level from "../Level";

export default class Trait {
    public name: string;
    constructor(name: string) {
      this.name = name;
    }
  
    public update(entity: Entity, deltaTime: number, level: Level): void {}
  
    public start(params?: any): void {}
  
    public cancel(): void {}

    public obstruct(entity: Entity, side: Side): void {}

    public collides(entity: Entity, collidingEntity: Entity): void {}
  }