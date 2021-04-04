HTMLCanvasElement.prototype.getContext = () => new MockContext();

class MockContext {
    drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh) {
        this.x = sx;
        this.y = sy;
        this.width = sw;
        this.height = sh;
    }
}