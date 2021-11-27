export function getAnimationFrame(frames: string[], frameLength: number) {
    return (distance: number) => {
        const frameIndex = Math.floor(distance / frameLength) % frames.length;
        const frameName = frames[frameIndex];
        return frameName;
    };
}