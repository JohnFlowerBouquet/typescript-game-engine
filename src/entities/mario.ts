import AudioBoard from "../AudioBoard";
import Entity from "../Entity";
import { loadSpriteSheet } from "../loaders/sprite";
import { loadAudioBoard } from "../loaders/audio";
import SpriteSheet from "../SpriteSheet";
import Jump from "../traits/Jump";
import Killable from "../traits/Killable";
import Physics from "../traits/Physics";
import Solid from "../traits/Solid";
import Stomper from "../traits/Stomper";
import Walk from "../traits/Walk";

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const walkTrait = entity.trait("walk") as Walk;
    const jumpTrait = entity.trait("jump") as Jump;
    const isFlipped = walkTrait.heading < 0;
    if (jumpTrait.falling) {
        return {
            frameName: "jump",
            isFlipped
        };
    }
    if (walkTrait.distance > 0) {
        if ((entity.velocity.x > 0 && walkTrait.direction < 0) || (entity.velocity.x < 0 && walkTrait.direction > 0)) {
            return {
                frameName: "break",
                isFlipped
            };
        }

        const runAnimation = entity.animations.get("run");
        return {
            frameName: runAnimation ? runAnimation(walkTrait.distance) : "",
            isFlipped
        }
    } else {
        return {
            frameName: "idle",
            isFlipped
        };
    }
}

export function loadMario(audioContext: AudioContext): Promise<() => Entity> {
    return Promise.all([
        loadAudioBoard("mario", audioContext),
        loadSpriteSheet("mario")
    ]).then(([audioBoard, sprite]) => createMarioFactory(sprite, audioBoard))
}

function createMarioFactory(sprite: SpriteSheet, audioBoard: AudioBoard): () => Entity {
    
    return function createMario() {
        const mario = new Entity(sprite, drawFunction, audioBoard);
        mario.size.set(16, 16);
        mario.addTrait(new Physics());
        mario.addTrait(new Solid());
        mario.addTrait(new Walk());
        mario.addTrait(new Jump());
        mario.addTrait(new Stomper());
        mario.addTrait(new Killable())

    return mario;
    }
}