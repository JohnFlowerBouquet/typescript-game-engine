interface Listener {
    name: Symbol;
    callback: GenericCallBack
}

type GenericCallBack = (...args: any[]) => void;

export default class EventEmitter {
    private _listeners: Listener[] = [];

    public listen(name: Symbol, callback: GenericCallBack): void {
        const listener = {name, callback};
        this._listeners.push(listener);
    }

    public emit(name: Symbol, ...args: any[]): void {
        this._listeners.forEach(listener => {
            if (listener.name === name) {
                listener.callback(...args);
            }
        })
    }
}