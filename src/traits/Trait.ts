import Entity from "../Entity";

export default class Trait {
    public name: string;
    constructor(name: string) {
      this.name = name;
    }
  
    public update(entity: Entity, deltaTime: number): void {}
  
    public start(params?: any): void {}
  
    public cancel(): void {}

    public obstruct(entity: Entity, side: string): void {}
  }