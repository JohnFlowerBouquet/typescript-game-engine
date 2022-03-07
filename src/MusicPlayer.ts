export default class MusicPlayer {
    private readonly tracks = new Map<string, HTMLAudioElement>();

    public addTrack(name: string, url: string): void {
        const audio = new Audio();
        audio.loop = true;
        audio.src = url;
        audio.muted = true;
        this.tracks.set(name, audio);
    }

    public playTrack(name: string, playBackRate: number): HTMLAudioElement | undefined {
        this.tracks.forEach(track => track.pause());
        const track = this.tracks.get(name);
        if (track) {
            track.playbackRate = playBackRate;
            track.play();
            track.muted = false;
            return track;
        }
    }
}