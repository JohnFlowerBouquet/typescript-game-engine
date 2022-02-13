import Entity from "./Entity";
import Level from "./Level";
import SpriteSheet from "./SpriteSheet";
import Player from "./traits/Player";
import PlayerController from "./traits/PlayerController";

export function createPlayerEnv(playerEntity: Entity): Entity {
    const imageStub = new Image();
    const playerEnv = new Entity(new SpriteSheet(imageStub, 0, 0), () => ({frameName: "", isFlipped: false}));
    const playerController = new PlayerController();
    playerController.setPlayer(playerEntity);
    playerController.setCheckpoint(64, 64);
    playerEnv.addTrait(playerController);
    return playerEnv;
}

export function createPlayer(entity: Entity): Entity {
    entity.addTrait(new Player());
    return entity;
}

export function* findPlayers(level: Level) {
    for (const entity of level.entities) {
        if (entity.hasTrait("player")) {
            yield entity;
        }
    }
}