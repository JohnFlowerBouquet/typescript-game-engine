import Entity, { Side } from "../Entity";
import { Tile } from "../Matrix";
import Trait from "./Trait";

export default class Solid extends Trait {
    private _obstructs = true;

    constructor() {
        super('solid');
    }

    public obstruct(entity: Entity, side: Side, match: Tile): void {
        if (!this._obstructs) {
            return;
        }
        switch(side) {
            case Side.top:
                entity.hitBox.top = match.y2;
                entity.velocity.y = 0;
                break;
            case Side.right:
                entity.hitBox.right = match.x1;
                entity.velocity.x = 0;
                break;
            case Side.bottom:
                entity.hitBox.bottom = match.y1;
                entity.velocity.y = 0;
                break;
            case Side.left:
                entity.hitBox.left = match.x2;
                entity.velocity.x = 0;
                break;
            default:
                break;
                    
        }
    }
}