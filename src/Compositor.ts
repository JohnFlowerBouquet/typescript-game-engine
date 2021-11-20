import Camera from "./Camera";
import { Layer } from "./layers";

export default class Compositor {
    private layers: Array<Layer>;
    constructor() {
      this.layers = [];
    }
  
    public addLayer(layer: Layer): void {
      this.layers.push(layer);
    }
  
    public draw(context: CanvasRenderingContext2D, camera: Camera): void {
      this.layers.forEach(layer => {
        layer(context, camera)
      });
    }
}