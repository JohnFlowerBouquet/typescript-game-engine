import SpriteSheet from "./spritesheet";
import { Vector } from "./vectors";

export class Trait {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }

  public update(entity: Entity, deltaTime: number): void {
    //
  }

  public start(params?: any): void {
    //
  }

  public cancel(): void {
    //
  }
}

export default class Entity {
    public position: Vector;
    public velocity: Vector;
    public size: Vector;

    private spriteSheet: SpriteSheet;
    private traits: Map<string, Trait>;

    constructor(spriteSheet: SpriteSheet) {
      this.position = new Vector(0, 0);
      this.velocity = new Vector(0, 0);
      this.size = new Vector(0, 0);
      this.spriteSheet = spriteSheet;
      this.traits = new Map();
    }

    public trait(traitName: string): Trait {
      const trait = this.traits.get(traitName);
      if (trait) {
        return trait;
      } else {
        throw new Error(`Could not find trait: ${traitName}`);
      }
    }
  
    public draw(context: CanvasRenderingContext2D): void {
      this.spriteSheet.draw('prince', context, this.position.x, this.position.y);
    }

    public addTrait(trait: Trait): void {
      this.traits.set(trait.name, trait);
    }

    public update(deltaTime: number): void {
      this.traits.forEach(trait => {
        trait.update(this, deltaTime);
      })
    }
  }