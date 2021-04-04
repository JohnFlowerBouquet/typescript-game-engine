enum KeyState {
    released,
    pressed
}

export default class Keyboard {
    private keyStates: Map<string, KeyState>;
    private keyMap: Map<string, (code: string) => void>;
    constructor() {
        this.keyStates = new Map();
        this.keyMap = new Map();
    }

    public addMaping(code: string, callback: (code: string) => void): void {
        this.keyMap.set(code, callback);
    }

    public handleEvent(event: KeyboardEvent): void {
        if (!this.keyMap.has(event.code)) {
            return;
        }

        event.preventDefault();

        const keyState = event.type === 'keydown' ? KeyState.pressed : KeyState.released;

        if (this.keyStates.get(event.code) === keyState) {
            return;
        }

        this.keyStates.set(event.code, keyState);
        const callback = this.keyMap.get(event.code);
        callback && callback(event.code);
    }

    public listenTo(): void {
        window.addEventListener('keydown', (event) => {
            this.handleEvent(event);
        });
        window.addEventListener('keyup', (event) => {
            this.handleEvent(event);
        });
    }
}