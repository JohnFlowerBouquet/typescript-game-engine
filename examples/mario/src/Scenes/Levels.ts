import Entity from "../../../../src/Entity";
import { Font } from "../../../../src/font";
import { GameContext } from "../../../../src/interface";
import { createCollisionLayer } from "../../../../src/layers/collision";
import { createDashboardLayer } from "../../../../src/layers/dashboard";
import { createPlayerProgerssLayer } from "../../../../src/layers/player-progress";
import Level from "../../../../src/Level";
import { createLevelLoader, TriggerSpec } from "../../../../src/loaders/level";
import { createPlayerEnv } from "../../../../src/player";
import Trigger from "../../../../src/traits/Trigger";
import { WaitingScreen } from "./WaitingScreen";

export const Levels = (gameContext: GameContext, name: string, player: Entity, font: Font) => {
    const levelLoader = createLevelLoader(gameContext.entityFactory);
    
    const loadLevel = (levelName: string) => levelLoader(levelName).then(level => {

        level.entities.add(player);

        const playerEnv = createPlayerEnv(player);
        level.entities.add(playerEnv);

        const dashboardLayer = createDashboardLayer(font, level)
        const playerProgressLayer = createPlayerProgerssLayer(font, level);
        level.compositor.addLayer(dashboardLayer);

        level.musicController.playTrack("main");

        if (process.env.NODE_ENV !== "production") {
            // setupMouseControl(canvas, mario, camera);
            level.compositor.addLayer(createCollisionLayer(level));
            // level.compositor.addLayer(createCameraLayer(camera));
        }

        const triggerCallback = (spec: TriggerSpec, trigger: Trigger, collidingEntities: Entity[]) => {
            if (spec.type === "goto") {
                for (const entity of collidingEntities) {
                    if (entity.hasTrait("player")) {
                        loadLevel(spec.name).then(level => gameContext.sceneRunner.run(level));
                    }
                }
            }
        }
        
        level.events.listen(Level.EVENT_TRIGGER, triggerCallback);

        
        const loadingScreen = WaitingScreen(dashboardLayer, playerProgressLayer, level);
        return loadingScreen;
    });

    return loadLevel(name)
}