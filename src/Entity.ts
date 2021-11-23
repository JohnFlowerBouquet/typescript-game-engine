import SpriteSheet from "./SpriteSheet";
import Trait from "./traits/Trait";
import { Vector } from "./vectors";

export default class Entity {
    public position: Vector;
    public velocity: Vector;
    public size: Vector;

    private spriteSheet: SpriteSheet;
    private traits: Map<string, Trait>;
    private getFrame: (entity: Entity) => {
        frameName: string;
        isFlipped: boolean;
    };

    constructor(
        spriteSheet: SpriteSheet,
        getFrame: (entity: Entity) => { frameName: string; isFlipped: boolean }
    ) {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.size = new Vector(0, 0);
        this.spriteSheet = spriteSheet;
        this.traits = new Map();
        this.getFrame = getFrame;
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
        const { frameName, isFlipped } = this.getFrame(this);
        this.spriteSheet.draw(frameName, context, 0, 0, isFlipped);
    }

    public addTrait(trait: Trait): void {
        this.traits.set(trait.name, trait);
    }

    public update(deltaTime: number): void {
        this.traits.forEach((trait) => {
            trait.update(this, deltaTime);
        });
    }
}
