interface Tile {
    name: string;
}

export default class Matrix {
    grid: Array<Tile[]>;
    constructor() {
        this.grid = [];
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
}