import { Vector } from "./vectors";

export default class Camera {
    public position: Vector;
    
    constructor() {
        this.position = new Vector(0, 0);
    }
}