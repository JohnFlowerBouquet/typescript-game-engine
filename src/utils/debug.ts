import Camera from "../Camera";
import Entity from "../Entity";
import { isMouseEvent } from "../typeGuards";

export function setupMouseControl(canvas: HTMLCanvasElement, entity: Entity, camera: Camera): void {
    let lastEvent: MouseEvent;
    ['mousedown', 'mouseup', 'mousemove'].forEach(eventName => {
        canvas.addEventListener(eventName, event => {
            console.log(event);
          if (isMouseEvent(event) && event.buttons === 1) {
            entity.velocity.set(0, 0);
            entity.position.set(event.offsetX + camera.position.x, event.offsetY + camera.position.y);
          } else if (isMouseEvent(event) && event.buttons === 2 && lastEvent?.type === 'mousemove') {
              camera.position.x -= event.offsetX - lastEvent.offsetX;
          }
          if (isMouseEvent(event)) lastEvent = event;
        })
      })
      canvas.addEventListener('contextmenu', event => event.preventDefault());
}