import MusicPlayer from "./MusicPlayer";

export default class MusicController {
    constructor(private musicPlayer: MusicPlayer) {}


    public setPlayer(musicPlayer: MusicPlayer): void {
        this.musicPlayer = musicPlayer;
    }

    public playTrack(name: string): void {
        this.musicPlayer.playTrack(name);
    }
}