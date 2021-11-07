export function getContext(): CanvasRenderingContext2D {
    const buffer = document.createElement("canvas");
    const context = buffer.getContext("2d");
    if (!context) {
        throw new Error(`Could not invoke getContext function`);
    }
    return context;
}