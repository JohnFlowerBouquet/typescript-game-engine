import { loadGoomba } from "../entities/goomba";
import { loadKoopa } from "../entities/koopa";
import { loadMario } from "../entities/mario";
import Entity from "../Entity";

type LoadEntity = () => Entity;
 export interface EntityFactory {
    [key: string]: LoadEntity
}

export function loadEntities(audioContext: AudioContext): Promise<EntityFactory> {
    const entityFactories: EntityFactory = {};

    function addAs(name: string): (factory: LoadEntity) => void {
        return (factory: LoadEntity) => entityFactories[name] = factory;
    }
    return Promise.all([
        loadMario(audioContext).then(addAs("mario")),
        loadGoomba().then(addAs("goomba")),
        loadKoopa().then(addAs("koopa"))
    ])
    .then(() => entityFactories);
}