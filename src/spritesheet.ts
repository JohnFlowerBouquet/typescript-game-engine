import { getCanvasWithContext } from "./utils/getCanvasWithContext";

export default class SpriteSheet {
    public tiles = new Map<string, HTMLCanvasElement[]>();
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
        const buffers = [false, true].map(isFlip => {
            const {canvas, context } = getCanvasWithContext(width, height);

            if (isFlip) {
                context.scale(-1, 1);
                context.translate(-width, 0);
            }

            context.drawImage(this.image, x, y, width, height, 0, 0, width, height);
            return canvas;
        })
        
        this.tiles.set(name, buffers);
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
        y: number,
        flip = false
    ): void {
        const buffers = this.tiles.get(name);
        if (buffers) {
            const buffer = flip ? buffers[1] : buffers[0];
            context.drawImage(buffer, x, y, this.width, this.height);
        }
    }

    public drawTile(name: string, context: CanvasRenderingContext2D, x: number, y: number): void {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
