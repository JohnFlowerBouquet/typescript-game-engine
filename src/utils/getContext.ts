export function getCanvasWithContext(
    width?: number,
    height?: number
): { canvas: HTMLCanvasElement; context: CanvasRenderingContext2D } {
    const canvas = document.createElement("canvas");
    canvas.width = width ? width : canvas.width;
    canvas.height = height ? height : canvas.height;

    const context = canvas.getContext("2d");
    if (!context) {
        throw new Error(`Could not invoke getContext function`);
    }
    return {
        canvas,
        context,
    };
}
