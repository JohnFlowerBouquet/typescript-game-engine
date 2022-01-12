export default class AudioBoard {
    constructor(
        private readonly _context: AudioContext,
        private readonly _buffers = new Map<string, AudioBuffer>()
    ) {}

    public addAudio(name: string, buffer: AudioBuffer): void {
        this._buffers.set(name, buffer);
    }

    public playAudio(name: string): void {
        const buffer = this._buffers.get(name);
        
        if (buffer) {
            const source = this._context.createBufferSource();
            source.connect(this._context.destination);
            source.buffer = buffer;
            source.start(0);
        }
    }
}
