import { loadImage } from "./loaders";
import SpriteSheet from "./SpriteSheet";

const CHARS = ' 0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ©!-×.';

export class Font {
    private _spriteSheet: SpriteSheet
    private _size: number;

    constructor(sprites: SpriteSheet, size: number) {
        this._spriteSheet = sprites;
        this._size = size;
    }

    print(text: string, context: CanvasRenderingContext2D, x: number, y: number): void {
        text.toUpperCase().split("").forEach((char, pos) => {
            this._spriteSheet.draw(char, context, x + pos * this._size, y);
        });
    }
}

export function loadFont(): Promise<Font> {
    return loadImage("./assets/font.png").then(image => {
        const fontSprite = new SpriteSheet(image, 8, 8);
        const size = 8;
        const rowLength = image.width;

        CHARS.split("").forEach((char, index) => {
            const x = index * size % rowLength;
            const y = Math.floor(index * size / rowLength) * size;
            fontSprite.define(char, x, y, size, size);
        });

        return new Font(fontSprite, size);
    })
}