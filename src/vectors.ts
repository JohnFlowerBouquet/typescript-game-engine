export class Vector {
    public x: number;
    public y: number;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    set(x: number, y: number): void {
      this.x = x;
      this.y = y;
    }
  }