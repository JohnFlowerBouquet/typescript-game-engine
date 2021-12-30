import Entity from "./Entity";
import { TILE_SIZE } from "./globals";
import Matrix from "./Matrix";
import SpriteSheet from "./SpriteSheet";
import TileCollider from "./TileCollider";
import Solid from "./traits/Solid";

 function getMockMatrixWithEntity(): {matrix: Matrix, entity: Entity} {
    const matrix = new Matrix();
    const mockMap = [
        ["block","block" ,"block" ,"block" ,"block"],
        ["block", "sky","sky","sky", "block"],
        ["block", "sky","sky","sky", "block"],
        ["block", "sky","sky","sky", "block"],
        ["block", "block", "block", "block", "block"],
    ]
    mockMap.forEach((column, y) => {
        column.forEach((name, x) => {
            matrix.set(x, y, {
                name,
                x1: x,
                x2: x + TILE_SIZE.width,
                y1: y,
                y2: y + TILE_SIZE.height 
            })
        })
    })

    const imageStub = new Image();
    const spritesheet = new SpriteSheet(imageStub, 0, 0);
    const entity = new Entity(spritesheet, () => ({frameName: "", isFlipped: false}));
    entity.addTrait(new Solid());
    entity.velocity.x = 0;
    entity.position.x = 32;
    entity.position.y = 64;

    return {
        matrix,
        entity
    };
 }

describe("TileCollider", () => {
    it("should create", async () => {
        const mockMatrix = new Matrix();
        const tileCollider = new TileCollider(mockMatrix);

        expect(tileCollider).toBeDefined();
    })

    it("checkX does NOT check collisions if entity velocity x is 0", async () => {
        const {matrix, entity} = getMockMatrixWithEntity();
        const tileCollider = new TileCollider(matrix);
        const spy = spyOn(matrix, "get");

        tileCollider.checkX(entity);

        expect(spy).toHaveBeenCalledTimes(0);
    })

    it("checkX does check for collisions if entity velocity is not 0", async () => {
        const {matrix, entity} = getMockMatrixWithEntity();
        const tileCollider = new TileCollider(matrix);
        entity.velocity.x = 1;
        const spy = spyOn(matrix, "get").and.callThrough();
        tileCollider.checkX(entity);

        expect(entity.velocity.x).toBe(1);
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it("checkX does update entity velocity to 0 if detects collision", async () => {
        const {matrix, entity} = getMockMatrixWithEntity();
        const tileCollider = new TileCollider(matrix);
        entity.velocity.x = 1;
        entity.position.x = 2;
        tileCollider.checkX(entity)

        expect(entity.velocity.x).toBe(0);
    })
})