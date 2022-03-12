import MusicPlayer from "./MusicPlayer";

export default class MusicController {
    constructor(private _musicPlayer: MusicPlayer) {}


    public setPlayer(musicPlayer: MusicPlayer): void {
        this._musicPlayer = musicPlayer;
    }

    public playTrack(name: string, playBackRate: number = 1): HTMLAudioElement | undefined {
        return this._musicPlayer.playTrack(name, playBackRate);
    }

    public pauseAll(): void {
        this._musicPlayer.pauseAll();
    }
}