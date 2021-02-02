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
        y: number
    ) {
        const buffer = document.createElement("canvas");
        const context = buffer.getContext("2d");
        buffer.width = this.width;
        buffer.height = this.height;
        if (!context) {
            throw new Error(`SpriteSheet.draw(): Sprite "${name}" not found`);
        }
        context.drawImage(this.image, x, y, this.width, this.height, 0, 0, this.width, this.height);

        this.tiles.set(name, buffer);
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
        context.drawImage(buffer, x, y);
    }

    public drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number): void {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
