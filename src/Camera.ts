import { Vector } from "./vectors";

export default class Camera {
    public position: Vector;
    public size: Vector;
    
    constructor() {
        this.position = new Vector(0, 0);
        this.size = new Vector(300, 500);
    }
}