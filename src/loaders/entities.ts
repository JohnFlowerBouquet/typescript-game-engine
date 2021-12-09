import { loadGoomba } from "../entities/goomba";
import { loadKoopa } from "../entities/koopa";
import { loadMario } from "../entities/mario";
import Entity from "../Entity";

type LoadEntity = () => Entity;

export function loadEntities(): Promise<{[key: string]: LoadEntity}> {
    const entityFactories: {[key: string]: LoadEntity} = {};

    function addAs(name: string): (factory: LoadEntity) => void {
        return (factory: LoadEntity) => entityFactories[name] = factory;
    }
    return Promise.all([
        loadMario().then(addAs("mario")),
        loadGoomba().then(addAs("goomba")),
        loadKoopa().then(addAs("koopa"))
    ])
    .then(() => entityFactories);
}