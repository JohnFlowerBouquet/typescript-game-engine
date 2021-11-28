import { getCanvasWithContext } from "./utils/getCanvasWithContext";

type FrameResolver = (distance: number) => string;

export default class SpriteSheet {
    public tiles = new Map<string, HTMLCanvasElement[]>();
    public animations = new Map<string, FrameResolver>();

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
    ): void {
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
    ): void {
        this.define(name, x *this.width, y * this.height, this.width, this.height);
    }

    public defineAnimation(name: string, animation: FrameResolver): void {
        this.animations.set(name, animation);
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
        if (name !== "sky" ) {
            this.draw("sky", context, x * this.width, y * this.height);
        }
        this.draw(name, context, x * this.width, y * this.height);
    }

    public drawAnimation(name: string, context: CanvasRenderingContext2D, x: number, y: number, distance: number): void {
        const frameResolver = this.animations.get(name);
        if (frameResolver) {
            const animationFrame = frameResolver(distance);
            this.drawTile(animationFrame, context, x, y);
        }
    }
}
