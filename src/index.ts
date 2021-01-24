function createCanvas() {
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    const context = canvas.getContext('2d');
  
    context?.fillRect(0, 0, 50, 50);
  
    return canvas;
  }
  
  document.body.appendChild(createCanvas());