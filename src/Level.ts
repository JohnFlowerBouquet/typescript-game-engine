import Compositor from "./Compositor";
import Entity from "./Entity";
import EntityCollider from "./EntityCollider";
import { GameContext } from "./interface";
import Matrix from "./Matrix";
import TileCollider from "./TileCollider";

export default class Level {
    public compositor: Compositor;
    public entities: Set<Entity>;
    public tiles: Matrix;
    public tileCollider: TileCollider;
    public gravity = 1500;
    public totalTime = 0;

    private _entityCollider: EntityCollider;

    constructor() {
        this.compositor = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
        this._entityCollider = new EntityCollider(this.entities);
    }

    public update(gameContext: GameContext): void {
        this.entities.forEach(entity => {
            entity.update(gameContext, this);
        })

        this.entities.forEach(entity => {
            this._entityCollider.check(entity);
        })

        this.entities.forEach(entity => entity.runQueuedTasks());
        
        this.totalTime += gameContext.deltaTime;
    }
}