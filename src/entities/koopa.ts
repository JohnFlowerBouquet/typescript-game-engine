import Entity, { Side } from "../Entity";
import { loadSpriteSheet } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import PendulumWalk from "../traits/PendulumWalk";

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const isFlipped = entity.velocity.x < 0;
    const walkAnimation = entity.animations.get("walk");
    return {
        frameName: walkAnimation ? walkAnimation(entity.lifeTime) : "",
        isFlipped
    };
}

export function loadKoopa(): Promise<() => Entity> {
    return loadSpriteSheet("koopa").then(sprite => createKoopaFactory(sprite))
}

function createKoopaFactory(sprite: SpriteSheet): () => Entity {
    return function createKoopa() {
        const koopa = new Entity(sprite, drawFunction);
        koopa.size.set(16, 24);
        koopa.offset.y = 8;
        koopa.addTrait(new PendulumWalk());

    return koopa;
    }
}