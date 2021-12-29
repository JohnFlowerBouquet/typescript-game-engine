import HitBox from "./HitBox";
import Level from "./Level";
import SpriteSheet from "./SpriteSheet";
import Trait from "./traits/Trait";
import { Vector } from "./vectors";

export enum Side {
    top,
    bottom,
    right,
    left
}

export default class Entity {
    public position: Vector;
    public velocity: Vector;
    public size: Vector;
    public offset: Vector;
    public lifeTime = 0;
    public hitBox: HitBox;

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
        this.offset = new Vector(0, 0);
        this.spriteSheet = spriteSheet;
        this.traits = new Map();
        this.getFrame = getFrame;
        this.hitBox = new HitBox(this.position, this.size, this.offset);
    }

    public get animations() {
        return this.spriteSheet.animations;
    }

    public trait(traitName: string): Trait {
        const trait = this.traits.get(traitName);
        if (trait) {
            return trait;
        } else {
            throw new Error(`Could not find trait: ${traitName}`);
        }
    }

    public hasTrait(traitName: string): boolean {
        const trait = this.traits.get(traitName);
        return !!trait;
    }

    public draw(context: CanvasRenderingContext2D): void {
        const { frameName, isFlipped } = this.getFrame(this);
        this.spriteSheet.draw(frameName, context, 0, 0, isFlipped);
    }

    public addTrait(trait: Trait): void {
        this.traits.set(trait.name, trait);
    }

    public obstruct(side: Side): void {
        this.traits.forEach((trait) => {
            trait.obstruct(this, side);
        });
    }

    public collides(collidingCandidate: Entity): void {
        this.traits.forEach((trait) => {
            trait.collides(this, collidingCandidate);
        });
    }

    public update(deltaTime: number, level: Level): void {
        this.traits.forEach((trait) => {
            trait.update(this, deltaTime, level);
        });
        this.lifeTime += deltaTime;
    }

    public runQueuedTasks(): void {
        this.traits.forEach(trait => trait.runTasks());
    }
}
