import Entity from "./Entity";
import { loadPrinceSprite } from "./sprites";
import Jump from "./traits/Jump";
import Velocity from "./traits/Velocity";

export function createPrince(): Promise<Entity> {
    return loadPrinceSprite().then(sprite => {
        const prince = new Entity(sprite);
        prince.addTrait(new Velocity());
        prince.addTrait(new Jump());
        prince.position.set(150, 35);
        return prince;
    })
}