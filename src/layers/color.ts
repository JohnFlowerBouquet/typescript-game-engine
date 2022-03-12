import Camera from "../Camera";
import { Layer } from "./layer.interface";

export function createColorLayer(color: string): Layer {
    return (context: CanvasRenderingContext2D, camera: Camera) => {
        context.fillStyle = color;
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
}