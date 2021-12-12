import Entity, { Side } from "../Entity";
import { loadSpriteSheet } from "../loaders";
import SpriteSheet from "../SpriteSheet";
import PendulumWalk from "../traits/PendulumWalk";

function drawFunction(entity: Entity): {frameName: string, isFlipped: boolean} {
    const isFlipped = false;
    const walkAnimation = entity.animations.get("walk");
    return {
        frameName: walkAnimation ? walkAnimation(entity.lifeTime) : "",
        isFlipped
    };
}

export function loadGoomba(): Promise<() => Entity> {
    return loadSpriteSheet("goomba").then(sprite => createGoombaFactory(sprite))
}

function createGoombaFactory(sprite: SpriteSheet): () => Entity {
    return function createGoomba() {
        const goomba = new Entity(sprite, drawFunction);
        goomba.size.set(16, 16);
        goomba.addTrait(new PendulumWalk());
    return goomba;
    }
}