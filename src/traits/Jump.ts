import Entity from "../Entity";
import Trait from "./Trait";

export default class Jump extends Trait {
    private duration = 0.5;
    private velocity = 200;
    private engageTime = 0;
    private ready = false;

    constructor() {
        super('jump');
    }

    public start(): void {
        if (this.ready) {
            this.engageTime = this.duration;
        }
    }

    public cancel(): void {
        this.engageTime = 0;
    }

    public obstruct(entity: Entity, side: string): void {
        if (side === "bottom") {
            this.ready = true;
        }
    }

    public update(entity: Entity, deltaTime: number): void {
        if (this.engageTime > 0) {
            entity.velocity.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
        this.ready = false;
    }
}