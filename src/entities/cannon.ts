import AudioBoard from "../AudioBoard";
import Entity from "../Entity";
import Level from "../Level";
import { loadAudioBoard } from "../loaders/audio";
import { EntityFactory } from "../loaders/entities";
import { findPlayers } from "../player";
import SpriteSheet from "../SpriteSheet";
import Emitter from "../traits/Emitter";

const HOLD_FIRE_THRESHOLD = 30;

export function loadCannon(
    audioContext: AudioContext,
    entityFactory: EntityFactory
): Promise<() => Entity> {
    return loadAudioBoard("cannon", audioContext).then((audioBoard) =>
        createCannonFactory(audioBoard, entityFactory)
    );
}

function createCannonFactory(
    audioBoard: AudioBoard,
    entityFactory: EntityFactory
): () => Entity {
    function emitBullet(entity: Entity, level: Level): void {
        let direction = 1;
        for (const player of findPlayers(level)) {
            if (
                player.position.x > entity.position.x - HOLD_FIRE_THRESHOLD &&
                player.position.x < entity.position.x + HOLD_FIRE_THRESHOLD
            ) {
                return;
            }

            if (player.position.x < entity.position.x) {
                direction = -1;
            }
        }
        entity.playSound("thwomp");
        const bullet = entityFactory["bullet"]();
        bullet.velocity.set(40 * direction, 0);
        level.entities.add(bullet);
        bullet.position.set(entity.position.x + 16, entity.position.y);
    }

    return function createCannon() {
        const imageStub = new Image();
        const spriteSheetStub = new SpriteSheet(imageStub, 0, 0);
        const drawFunctionStub = () => ({ frameName: "", isFlipped: false });
        const cannon = new Entity(
            spriteSheetStub,
            drawFunctionStub,
            audioBoard
        );
        cannon.position.set(176, 216);

        const emitterTrait = new Emitter();
        emitterTrait.addEmitter(emitBullet);
        cannon.addTrait(emitterTrait);

        return cannon;
    };
}
