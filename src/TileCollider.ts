import Entity from "./Entity";
import { GameContext } from "./interface";
import Level from "./Level";
import Matrix from "./Matrix";
import TileResolver from "./TileResolver";
import { bricks } from "./tiles/brick";
import { coin } from "./tiles/coin";
import { ground } from "./tiles/ground";
import { TileCollisionHandler } from "./tiles/tileCollisionHandler.interface";

const colliders = new Set<string>(["ground", "bricks", "block", "question", "pipe-insert-vert-left", "pipe-insert-vert-right", "pipe-vert-left", "pipe-vert-right"]);

const handlers: {[key: string]: TileCollisionHandler[]} = {
    ground,
    bricks,
    coin
}

export default class TileCollider {
    public tiles: TileResolver;

    constructor(matrix: Matrix) {
        this.tiles = new TileResolver(matrix);
    }

    public checkX(entity: Entity, gameContext: GameContext, level: Level): void {
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
                handler[0](entity, match, this.tiles, gameContext, level);
            }
        })
    }

    public checkY(entity: Entity, gameContext: GameContext, level: Level): void {
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
                handler[1](entity, match, this.tiles, gameContext, level);
            }
        })
    }
}