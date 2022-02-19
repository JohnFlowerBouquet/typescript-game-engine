import Entity, { Side } from "./Entity";
import Matrix, { Tile } from "./Matrix";
import TileResolver from "./TileResolver";
import { ground } from "./tiles/ground";

const colliders = new Set<string>(["ground", "bricks", "block", "question", "pipe-insert-vert-left", "pipe-insert-vert-right", "pipe-vert-left", "pipe-vert-right"]);

type Handler = (entity: Entity, match: Tile) => void;

const handlers: {[key: string]: Handler[]} = {
    ground
}

export default class TileCollider {
    public tiles: TileResolver;

    constructor(matrix: Matrix) {
        this.tiles = new TileResolver(matrix);
    }

    public checkX(entity: Entity): void {
        let x: number;
        if (entity.velocity.x > 0) {
            x = entity.hitBox.right;
        } else if (entity.velocity.x < 0) {
            x = entity.hitBox.left;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            x,
            x, 
            entity.hitBox.top,
            entity.hitBox.bottom
        );
        
        matches.forEach(match => {
            const handler = handlers[match.name];
            if (handler) {
                handler[0](entity, match);
            }
        })
    }

    public checkY(entity: Entity): void {
        let y: number;
        if (entity.velocity.y > 0) {
            y = entity.hitBox.bottom;
        } else if (entity.velocity.y < 0) {
            y = entity.hitBox.top;
        } else {
            return;
        }
        const matches = this.tiles.searchByRange(
            entity.hitBox.left,
            entity.hitBox.right, 
            y,
            y
        );
        
        matches.forEach(match => {
            const handler = handlers[match.name]
            if (handler) {
                handler[1](entity, match);
            }
        })
    }
}