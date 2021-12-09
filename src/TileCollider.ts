import Entity, { Side } from "./Entity";
import Matrix from "./Matrix";
import TileResolver from "./TileResolver";

const colliders = new Set<string>(["ground", "bricks", "block", "question", "pipe-insert-vert-left", "pipe-insert-vert-right", "pipe-vert-left", "pipe-vert-right"]);
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
            if (!colliders.has(match.name)) {
                return;
            }
    
            if (entity.velocity.x > 0) {
                if (entity.hitBox.right > match.x1) {
                    entity.hitBox.right = match.x1;
                    entity.velocity.x = 0;
                    entity.obstruct(Side.right);
                }
            } else if (entity.velocity.x < 0) {
                if (entity.hitBox.left < match.x2) {
                    entity.hitBox.left = match.x2;
                    entity.velocity.x = 0;
                    entity.obstruct(Side.left);
                }
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
            if (!colliders.has(match.name)) {
                return;
            }
    
            if (entity.velocity.y > 0) {
                if (entity.hitBox.bottom > match.y1) {
                    entity.hitBox.bottom = match.y1;
                    entity.velocity.y = 0;
                    entity.obstruct(Side.bottom);
                }
            } else if (entity.velocity.y < 0) {
                if (entity.hitBox.top  < match.y2) {
                    entity.hitBox.top = match.y2;
                    entity.velocity.y = 0;
                    entity.obstruct(Side.top);
                }
            }
        })
    }
}