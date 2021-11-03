export default class SpriteSheet {
    public tiles = new Map<string, HTMLCanvasElement>();
    public animations = new Map<string, Animation>();

    constructor(
        public image: HTMLImageElement,
        public width: number,
        public height: number
    ) {}

    public define(
        name: string,
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        const buffer = document.createElement("canvas");
        const context = buffer.getContext("2d");
        buffer.width = width;
        buffer.height = height;
        if (!context) {
            throw new Error(`SpriteSheet.draw(): Sprite "${name}" not found`);
        }
        context.drawImage(this.image, x, y, width, height, 0, 0, width, height);

        this.tiles.set(name, buffer);
    }

    public defineTile(
        name: string,
        x: number,
        y: number
    ) {
        this.define(name, x *this.width, y * this.height, this.width, this.height);
    }

    public draw(
        name: string,
        context: CanvasRenderingContext2D,
        x: number,
        y: number
    ): void {
        const buffer = this.tiles.get(name);
        if (!buffer) {
            throw new Error(`SpriteSheet.draw(): Sprite "${name}" not found`);
        }
        context.drawImage(buffer, x, y, this.width, this.height);
    }

    public drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number): void {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
