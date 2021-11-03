import { TILE_SIZE } from "./globals";
import Matrix, { Tile } from "./Matrix";

export default class TileResolver {
    public matrix: Matrix;
    public tileSize: number;
    constructor(matrix: Matrix, tileSize = TILE_SIZE.width) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    public toIndex(position: number): number {
        return Math.floor(position / this.tileSize);
    }

    public toIndexRange(position1: number, position2: number): number[] {
        const pMax = Math.ceil(position2/ this.tileSize) * this.tileSize;
        const range = [];
        let position = position1;
        do {
            range.push(this.toIndex(position));
            position += this.tileSize;
        } while (position < pMax);
        return range;
    }

    public getByIndex(x: number, y: number): Tile {
        const tile = this.matrix.get(x, y);
        const x1 = x * this.tileSize;
        const x2 = x1 + this.tileSize;
        const y1 = y * this.tileSize;
        const y2 = y1 + this.tileSize;
        return {
            name: tile.name,
            x1,
            x2,
            y1,
            y2
        };
    }

    public searchByPosition(x: number, y: number): Tile {
        return this.getByIndex(
            this.toIndex(x),
            this.toIndex(y)
        )
    }

    public searchByRange(x1: number, x2: number, y1: number, y2: number): Tile[] {
        const matches: Tile[] = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if (match) {
                    matches.push(match);
                }
            })
        })
        return matches;
    }
}