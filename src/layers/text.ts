import Camera from "../Camera";
import { Font } from "../font";
import { Layer } from "./layer.interface";

export function createTextLayer(font: Font, text: string): Layer {
    const fontSize = font.size;

    return (context: CanvasRenderingContext2D, camera: Camera) => {
        const textWidth = text.length;
        const screenWidth = Math.floor(context.canvas.width / fontSize);
        const screenHigh = Math.floor(context.canvas.height / fontSize);
        const x = screenWidth /2 - textWidth / 2;
        const y =screenHigh / 2 - fontSize / 2;
        font.print(text, context, x * fontSize, y * fontSize);
    }
}