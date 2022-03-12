import Camera from "./Camera";
import Compositor from "./Compositor";
import EventEmitter from "./EventEmitter";
import { GameContext } from "./interface";

export default class Scene {
    static EVENT_COMPLETE = Symbol("scene complete");
    
    public readonly compositor = new Compositor()
    public readonly events = new EventEmitter();

    private readonly _camera = new Camera();

    public get camera() {
        return this._camera;
    }

    public update(gameContext: GameContext): void {
        //
    }

    public draw(gameContext: GameContext): void {
        this.compositor.draw(gameContext.videoContext, this.camera);
    }
}