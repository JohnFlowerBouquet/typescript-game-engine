interface Listener {
    name: Symbol;
    callback: (...args: unknown[]) => void
}

export default class EventEmitter {
    private _listeners: Listener[] = [];

    public listen(name: Symbol, callback: () => void): void {
        const listener = {name, callback};
        this._listeners.push(listener);
    }

    public emit(name: Symbol, ...args: unknown[]): void {
        this._listeners.forEach(listener => {
            if (listener.name === name) {
                listener.callback(...args);
            }
        })
    }
}