export interface Tile {
    name: string;
    y1: number;
    y2: number;
    x1: number;
    x2: number;
}

export default class Matrix {
    grid: Array<Tile[]>;
    constructor() {
        this.grid = [];
    }

    public forEach(callback: (tile: Tile, x: number, y: number) => void): void {
        this.grid.forEach((column, x) => {
            column.forEach((value, y) => {
                callback(value, x, y);
            })
        })
    }

    public get (x: number, y: number): Tile {
        return this.grid[x][y];
    }

    public set(x: number, y: number, value: Tile): void {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }

    clear() {
        this.grid.length = 0;
    }
}