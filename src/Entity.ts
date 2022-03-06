import AudioBoard from "./AudioBoard";
import EventBuffer from "./EventBuffer";
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

    private _sounds = new Set<string>();
    private _traits: Map<string, Trait>;
    private _events = new EventBuffer();
    
    constructor(
        private _spriteSheet: SpriteSheet,
        private _getFrame: (entity: Entity) => { frameName: string; isFlipped: boolean },
        private _audioBoard?: AudioBoard
    ) {
        this.position = new Vector(0, 0);
        this.velocity = new Vector(0, 0);
        this.size = new Vector(0, 0);
        this.offset = new Vector(0, 0);
        this.hitBox = new HitBox(this.position, this.size, this.offset);
        this._traits = new Map();
    }

    public get animations() {
        return this._spriteSheet.animations;
    }

    public get events() {
        return this._events;
    }

    public trait(traitName: string): Trait {
        const trait = this._traits.get(traitName);
        if (trait) {
            return trait;
        } else {
            throw new Error(`Could not find trait: ${traitName}`);
        }
    }

    public hasTrait(traitName: string): boolean {
        const trait = this._traits.get(traitName);
        return !!trait;
    }

    public draw(context: CanvasRenderingContext2D): void {
        const { frameName, isFlipped } = this._getFrame(this);
        this._spriteSheet.draw(frameName, context, 0, 0, isFlipped);
    }

    public addTrait(trait: Trait): void {
        this._traits.set(trait.name, trait);
    }

    public obstruct(side: Side, match: Tile): void {
        this._traits.forEach((trait) => {
            trait.obstruct(this, side, match);
        });
    }

    public collides(collidingCandidate: Entity): void {
        this._traits.forEach((trait) => {
            trait.collides(this, collidingCandidate);
        });
    }

    public update(gameContext: GameContext, level: Level): void {
        this._traits.forEach((trait) => {
            trait.update(this, gameContext, level);
        });

        if (this._audioBoard) {
            this._playSounds(this._audioBoard, gameContext.audioContext);
        }
        
        this.lifeTime += gameContext.deltaTime;
    }

    public runQueuedTasks(): void {
        this.events.emit(Trait.EVENT_TASK);
        this._traits.forEach(trait => trait.runTasks(this));
        this.events.clear();
    }

    public playSound(name: string): void {
        this._sounds.add(name);
    }

    private _playSounds(audioBoard: AudioBoard, audioContext: AudioContext): void {
        this._sounds.forEach(sound => audioBoard.playAudio(sound, audioContext));
        this._sounds.clear();
    }
}
