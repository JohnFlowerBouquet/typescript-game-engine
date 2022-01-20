export class Vector {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public copy(vector: Vector): void {
        this.x = vector.x;
        this.y = vector.y;
    }
}
