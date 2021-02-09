export default class Compositor {
    private layers: Array<(context: CanvasRenderingContext2D) => void>;
    constructor() {
      this.layers = [];
    }
  
    public addLayer(layer: any): void {
      this.layers.push(layer);
    }
  
    public draw(context: CanvasRenderingContext2D): void {
      this.layers.forEach(layer => {
        layer(context)
      })
    }
}