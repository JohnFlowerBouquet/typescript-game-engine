export function createAudioLoader(context: AudioContext): (url: string) => Promise<AudioBuffer> {
    return function loadAudio(url: string): Promise<AudioBuffer> {
        return fetch(url).then(response => {
            return response.arrayBuffer();
        }).then(arrayBuffer => {
            return context.decodeAudioData(arrayBuffer);
        })
    }
}