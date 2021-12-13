import { Vector } from "./vectors";

export default class HitBox {
    constructor(
        private _position: Vector,
        private _size: Vector,
        private _offset: Vector
    ) {}

    public overlaps(hitBox: HitBox): boolean {
        return (
            this.bottom > hitBox.top &&
            this.top < hitBox.bottom &&
            this.left < hitBox.right &&
            this.right > hitBox.left
        );
    }

    public get top() {
        return this._position.y + this._offset.y;
    }

    public set top(y: number) {
        this._position.y = y - this._offset.y;
    }

    public get right() {
        return this._position.x + this._size.x + this._offset.x;
    }

    public set right(x: number) {
        this._position.x = x - (this._size.x + this._offset.x);
    }

    public get bottom() {
        return this._position.y + this._size.y;
    }

    public set bottom(y: number) {
        this._position.y = y - this._size.y;
    }

    public get left() {
        return this._position.x + this._offset.x;
    }

    public set left(x: number) {
        this._position.x = x - this._offset.x;
    }
}
