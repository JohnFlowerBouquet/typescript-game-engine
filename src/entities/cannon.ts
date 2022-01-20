import AudioBoard from "../AudioBoard";
import Entity from "../Entity";
import Level from "../Level";
import { loadAudioBoard } from "../loaders/audio";
import { EntityFactory } from "../loaders/entities";
import SpriteSheet from "../SpriteSheet";
import Emitter from "../traits/Emitter";

export function loadCannon(audioContext: AudioContext, entityFactory: EntityFactory): Promise<() => Entity> {
    return loadAudioBoard("mario", audioContext).then(audioBoard => createCannonFactory(audioBoard, entityFactory))
}

function createCannonFactory(audioBoard: AudioBoard, entityFactory: EntityFactory): () => Entity {
    function emitBullet(entity: Entity, level: Level): void {
        const bullet = entityFactory["bullet"]();
        level.entities.add(bullet);
        bullet.position.copy(entity.position);
    }

    return function createCannon() {
        const imageStub = new Image();
        const spriteSheetStub = new SpriteSheet(imageStub, 0, 0);
        const drawFunctionStub = () => ({frameName: "", isFlipped: false});
        const cannon = new Entity(spriteSheetStub, drawFunctionStub, audioBoard);
        cannon.position.set(176, 216);

        const emitterTrait = new Emitter();
        emitterTrait.addEmitter(emitBullet);
        cannon.addTrait(emitterTrait);

    return cannon;
    }
}