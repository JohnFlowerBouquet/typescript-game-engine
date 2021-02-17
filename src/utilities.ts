import Entity from "./Entity";
import { loadPrinceSprite } from "./sprites";

export function createPrince(): Promise<Entity> {
    return loadPrinceSprite().then(sprite => {
        const prince = new Entity(sprite);
        prince.position.set(150, 35);
        prince.velocity.set(20, -10);
        return prince;
    })
}