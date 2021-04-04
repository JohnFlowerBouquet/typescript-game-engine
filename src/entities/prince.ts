import Entity from "../Entity";
import { loadPrinceSprite } from "../sprites";
import Jump from "../traits/Jump";
import Velocity from "../traits/Velocity";
import Walk from "../traits/Walk";

export function createPrince(): Promise<Entity> {
    return loadPrinceSprite().then(sprite => {
        const prince = new Entity(sprite);
        prince.size.set(10, 41);
        prince.addTrait(new Walk());
        prince.addTrait(new Jump());
        // prince.addTrait(new Velocity());
        
        prince.position.set(150, 35);
        return prince;
    })
}