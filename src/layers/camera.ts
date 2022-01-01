import Camera from "../Camera";
import { Layer } from "../layers";

export function createCameraLayer(camera: Camera): Layer {
    return function drawCameraRect(
        context: CanvasRenderingContext2D,
        fromCamera: Camera
    ) {
        context.strokeStyle = "purple";
        context.rect(
            camera.position.x - fromCamera.position.x,
            camera.position.y - fromCamera.position.y,
            camera.size.x,
            camera.size.y
        );
        context.stroke();
    };
}