import { GameContext } from "../../../../src/interface";
import { createColorLayer } from "../../../../src/layers/color";
import { Layer } from "../../../../src/layers/layer.interface";
import Scene from "../../../../src/Scene";

export const WaitingScreen = (dashboardLayer: Layer, playerProgressLayer: Layer) => {
    const waitingScreen = new CompositionScene();
    waitingScreen.compositor.addLayer(createColorLayer("#000"));
    waitingScreen.compositor.addLayer(dashboardLayer);
    waitingScreen.compositor.addLayer(playerProgressLayer);
    return waitingScreen;
}

class CompositionScene extends Scene {
    private _countdown = 2;

    public update(gameContext: GameContext): void {
        this._countdown -= gameContext.deltaTime;
        if (this._countdown <= 0) {
            this.events.emit(Scene.EVENT_COMPLETE);
        }
    }
}