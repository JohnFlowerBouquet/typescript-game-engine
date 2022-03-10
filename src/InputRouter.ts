import Entity from "./Entity";

export default class InputRouter {
    private _recivers = new Set<Entity>();

    public addReceiver(receiver: Entity) {
        this._recivers.add(receiver)
    }

    public dropReceiver(receiver: Entity) {
        this._recivers.delete(receiver)
    }

    public route(routeInput: (entity: Entity) => void): void {
        this._recivers.forEach(receiver => routeInput(receiver));
    }
}