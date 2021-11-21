import Entity from "../Entity";
import { loadSpriteSheet } from "../loaders";
import Jump from "../traits/Jump";
import Walk from "../traits/Walk";

export function createMario(): Promise<Entity> {
    return loadSpriteSheet("mario").then(sprite => {
        const mario = new Entity(sprite);
        mario.size.set(16, 16);
        mario.addTrait(new Walk());
        mario.addTrait(new Jump());
        mario.position.set(64, 64);

        return mario;
    })
}