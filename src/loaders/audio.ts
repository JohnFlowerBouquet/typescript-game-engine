import AudioBoard from "../AudioBoard";
import { loadJSON } from "../loaders";

interface AudioSheet {
    fx: {
        [key: string]: {
            url: string
        }
    }
}

export function loadAudioBoard(name: string, audioContext: AudioContext): Promise<AudioBoard> {
    const loadAudio = createAudioLoader(audioContext);
    return loadJSON<AudioSheet>(`/audio/${name}.json`).then(audioSheet => {
        const audioBoard = new AudioBoard();
        const fx = audioSheet.fx;
        const jobs: Promise<void>[] = [];
        Object.keys(fx).forEach(name => {
            const url = fx[name].url;
            const job = loadAudio(url).then(buffer => {
                audioBoard.addAudio(name, buffer);
            })
            jobs.push(job);
        })
        return Promise.all(jobs).then(() => audioBoard);
    })
}

export function createAudioLoader(context: AudioContext): (url: string) => Promise<AudioBuffer> {
    return function loadAudio(url: string): Promise<AudioBuffer> {
        return fetch(url).then(response => {
            return response.arrayBuffer();
        }).then(arrayBuffer => {
            return context.decodeAudioData(arrayBuffer);
        })
    }
}