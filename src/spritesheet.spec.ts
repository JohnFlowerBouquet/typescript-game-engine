import SpriteSheet from "./spritesheet";

describe("SpriteSheet", () => {
  it("should create", async () => {
    const imageStub = new Image();
    const spritesheet = new SpriteSheet(imageStub, 100, 100);
    expect(spritesheet).toBeDefined();
  });

  it("define should set tile", async () => {
    const imageStub = new Image();
    const spritesheet = new SpriteSheet(imageStub, 100, 100);
    spritesheet.define("testSprite", 100, 150, 200, 250)
    expect(spritesheet.tiles.get("testSprite")).toBeDefined();
    expect(spritesheet.tiles.get("testSprite")?.width).toBe(200);
    expect(spritesheet.tiles.get("testSprite")?.height).toBe(250);
  });
});