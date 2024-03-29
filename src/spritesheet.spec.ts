import SpriteSheet from "./SpriteSheet";
import { getCanvasWithContext } from "./utils/getCanvasWithContext";

describe("SpriteSheet", () => {
    it("should create", async () => {
        const imageStub = new Image();
        const spritesheet = new SpriteSheet(imageStub, 100, 100);
        expect(spritesheet).toBeDefined();
    });

    it("define should set tile", async () => {
        const imageStub = new Image();
        const spritesheet = new SpriteSheet(imageStub, 100, 100);
        spritesheet.define("testSprite", 100, 150, 200, 250);

        const tile = spritesheet.tiles.get("testSprite")?.[0];
        expect(tile).toBeDefined();
        expect(tile?.width).toBe(200);
        expect(tile?.height).toBe(250);
    });

    it("draw should invoke drawImage on context", async () => {
        const imageStub = new Image();
        const spritesheet = new SpriteSheet(imageStub, 150, 250);
        spritesheet.define("testSprite", 100, 150, 200, 250);
        const tile = spritesheet.tiles.get("testSprite")?.[0];
        const { context } = getCanvasWithContext();
        const spy = spyOn(context, "drawImage");

        spritesheet.draw("testSprite", context, 100, 200);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toBeCalledWith(tile, 100, 200, 150, 250);
    });

    it("draw should NOT invoke drawImage if buffer is not found", async () => {
        const imageStub = new Image();
        const spritesheet = new SpriteSheet(imageStub, 150, 250);
        const { context } = getCanvasWithContext();
        const spy = spyOn(context, "drawImage");

        spritesheet.draw("testSprite", context, 100, 200);
        expect(spy).toHaveBeenCalledTimes(0);
    });
});
