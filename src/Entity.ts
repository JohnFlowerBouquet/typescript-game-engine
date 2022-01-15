import AudioBoard from "./AudioBoard";
import HitBox from "./HitBox";
import { GameContext } from "./interface";
import Level from "./Level";
import { Tile } from "./Matrix";
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

    private traits: Map<string, Trait>;
    private getFrame: (entity: Entity) => {
        frameName: string;
        isFlipped: boolean;
    };
    
    constructor(
        private spriteSheet: SpriteSheet,
        getFrame: (entity: Entity) => { frameName: string; isFlipped: boolean },
        private audioBoard?: AudioBoard
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

    public obstruct(side: Side, match: Tile): void {
        this.traits.forEach((trait) => {
            trait.obstruct(this, side, match);
        });
    }

    public collides(collidingCandidate: Entity): void {
        this.traits.forEach((trait) => {
            trait.collides(this, collidingCandidate);
        });
    }

    public update(gameContext: GameContext, level: Level): void {
        this.traits.forEach((trait) => {
            trait.update(this, gameContext, level);
            if (this.audioBoard) {
                trait.playSounds(this.audioBoard, gameContext.audioContext);
            }
        });
        this.lifeTime += gameContext.deltaTime;
    }

    public runQueuedTasks(): void {
        this.traits.forEach(trait => trait.runTasks());
    }

    public playAudio(name: string, audioContext: AudioContext): void {
        this.audioBoard?.playAudio(name, audioContext);
    }
}
