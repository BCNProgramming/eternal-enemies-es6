'user strict';

class Points {
  constructor(canvas, y, speed) {
    this.canvas = canvas;
    this.direction = 0;
    this.size = 20;
    this.x =  canvas.width + this.size;
    this.y = y;
    this.ctx = this.canvas.getContext('2d');
    this.speed = speed;
  }
  
  isInScreen() {
    return this.x + this.size / 2 > 0;
  };
  
  update() {
    this.x = this.x - this.speed;
  
    // todo prevent Points from moving outside of screen
  };
  
  draw() {
    this.ctx.fillStyle = 'green';
    const xPosition = this.x - this.size / 2;
    const yPosition = this.y - this.size / 2;
    this.ctx.fillRect(xPosition, yPosition , this.size, this.size);
  };
}

