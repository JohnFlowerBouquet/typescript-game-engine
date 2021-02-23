import Compositor from "./Compositor";
import Matrix from "./Matrix";

export default class Level {
    public compositor: Compositor;
    public entities: Set<any>;
    public tiles: Matrix;

    constructor() {
        this.compositor = new Compositor();
        this.entities = new Set();
        this.tiles = new Matrix();
    }

    public update(deltaTime: number): void {
        this.entities.forEach(entity => {
            entity.update(deltaTime);
        })
    }
}