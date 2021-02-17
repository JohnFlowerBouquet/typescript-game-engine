import SpriteSheet from "./spritesheet";
import { Vector } from "./vectors";

export default class Entity {
    public position: Vector;
    public velocity: Vector;
    private spriteSheet: SpriteSheet;
    constructor(spriteSheet: SpriteSheet) {
      this.position = new Vector(0, 0);
      this.velocity = new Vector(0, 0);
      this.spriteSheet = spriteSheet;
    }
  
    public update(deltaTime: number): void {
      this.position.x += this.velocity.x * deltaTime;
      this.position.y += this.velocity.y * deltaTime;
    }
  
    public draw(context: CanvasRenderingContext2D): void {
      this.spriteSheet.draw('prince', context, this.position.x, this.position.y);
    }
  }