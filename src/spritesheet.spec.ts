import SpriteSheet from "./spritesheet";

describe("SpriteSheet", () => {
  it("should create", async () => {
    const imageStub = new Image();
    const spritesheet = new SpriteSheet(imageStub, 100, 100);
    expect(spritesheet).toBeDefined();
  });
});