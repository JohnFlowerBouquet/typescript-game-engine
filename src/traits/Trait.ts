import Entity, { Side } from "../Entity";
import { GameContext } from "../interface";
import Level from "../Level";
import { Tile } from "../Matrix";

type Task = () => void;
interface Listener {
    name: Symbol;
    callback: Task;
    count: number;
}
export default class Trait {
    static EVENT_TASK = Symbol("task");
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    private _listeners: Listener[] = [];

    public update(entity: Entity, gameContext: GameContext, level: Level): void {}
    public start(params?: any): void {}
    public cancel(): void {}
    public obstruct(entity: Entity, side: Side, match: Tile): void {}
    public collides(entity: Entity, collidingEntity: Entity): void {}

    public queue(task: Task): void {
        this.listen(Trait.EVENT_TASK, task, 1);
    }

    public runTasks(entity: Entity): void {
        this._listeners = this._listeners.filter(listener => {
            this._listeners.forEach(listener => entity.events.process(listener.name, listener.callback));
            return --listener.count;
        })
    }

    public listen(name: Symbol, callback: Task, count: number = Infinity): void {
        this._listeners.push({
            name,
            callback,
            count
        })
    }
}
