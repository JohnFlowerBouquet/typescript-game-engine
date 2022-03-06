import { loadJSON } from "../loaders";
import MusicPlayer from "../MusicPlayer";

interface AudioSheet {
    [key: string]: {
        url: string
    }
}

export function loadMusicSheet(name: string): Promise<MusicPlayer> {
    return loadJSON<AudioSheet>(`/music/${name}.json`).then(musicSheet => {
        const musicPlayer = new MusicPlayer();
        for (const [name, track] of Object.entries(musicSheet)) {
            musicPlayer.addTrack(name, track.url)
        }
        return musicPlayer;
    })
}