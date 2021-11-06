import Entity from "../Entity";
import Trait from "./Trait";

export default class Jump extends Trait {
    private duration = 0.5;
    private velocity = 200;
    private engageTime = 0;
    constructor() {
        super('jump');
    }

    public start(): void {
        this.engageTime = this.duration;
    }

    public cancel(): void {
        this.engageTime = 0;
    }

    public update(entity: Entity, deltaTime: number): void {
        if (this.engageTime > 0) {
            entity.velocity.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}