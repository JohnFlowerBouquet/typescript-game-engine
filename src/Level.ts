import Compositor from "./Compositor";
import Entity from "./Entity";
import Matrix from "./Matrix";
import TileCollider from "./TileCollider";

export default class Level {
    public compositor: Compositor;
    public entities: Set<Entity>;
    public tiles: Matrix;
    public tileCollider: TileCollider;
    public gravity = 1500;
    public totalTime = 0;

    constructor() {
        this.compositor = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
        this.tileCollider = new TileCollider(this.tiles);
    }

    public update(deltaTime: number): void {
        this.entities.forEach(entity => {
            entity.update(deltaTime);

            entity.position.x += entity.velocity.x * deltaTime;
            this.tileCollider.checkX(entity);

            entity.position.y += entity.velocity.y * deltaTime;
            this.tileCollider.checkY(entity);

            entity.velocity.y += this.gravity * deltaTime;
        })
        this.totalTime += deltaTime;
    }
}