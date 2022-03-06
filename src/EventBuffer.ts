interface Event {
    name: Symbol;
    args: unknown[];
}

export default class EventBuffer {
    private _events: Event[] = [];

    public emit(name: Symbol, ...args: unknown[]): void {
        const event: Event = {name, args};
        this._events.push(event);
    }

    public process(name: Symbol, callback: (...args: unknown[]) => void): void {
        this._events.forEach(event => {
            if (event.name === name) {
                callback(...event.args);
            }
        })
    }

    public clear(): void {
        this._events = [];
    }
}