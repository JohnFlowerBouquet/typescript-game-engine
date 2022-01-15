export default class AudioBoard {
    constructor(
        private readonly _buffers = new Map<string, AudioBuffer>()
    ) {}

    public addAudio(name: string, buffer: AudioBuffer): void {
        this._buffers.set(name, buffer);
    }

    public playAudio(name: string, audioContext: AudioContext): void {
        const buffer = this._buffers.get(name);
        
        if (buffer) {
            const source = audioContext.createBufferSource();
            source.connect(audioContext.destination);
            source.buffer = buffer;
            source.start(0);
        }
    }
}
