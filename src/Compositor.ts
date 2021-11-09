import Camera from "./Camera";

export default class Compositor {
    private layers: Array<(context: CanvasRenderingContext2D, camera: Camera) => void>;
    constructor() {
      this.layers = [];
    }
  
    public addLayer(layer: any): void {
      this.layers.push(layer);
    }
  
    public draw(context: CanvasRenderingContext2D, camera: Camera): void {
      this.layers.forEach(layer => {
        layer(context, camera)
      });
    }
}