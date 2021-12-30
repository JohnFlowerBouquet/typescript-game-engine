import Entity, { Side } from "../Entity";
import Level from "../Level";
import { Tile } from "../Matrix";

type Task = () => void;
export default class Trait {
    public name: string;
    constructor(name: string) {
        this.name = name;
    }

    private _tasksQueue: Task[] = [];

    public update(entity: Entity, deltaTime: number, level: Level): void {}

    public start(params?: any): void {}

    public cancel(): void {}

    public obstruct(entity: Entity, side: Side, match: Tile): void {}

    public collides(entity: Entity, collidingEntity: Entity): void {}

    public queue(task: Task): void {
        this._tasksQueue.push(task);
    }

    public runTasks(): void {
        this._tasksQueue.forEach((task) => task());
        this._tasksQueue.length = 0;
    }
}
