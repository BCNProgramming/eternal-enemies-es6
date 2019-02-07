'user strict';

class Enemy {
  constructor(canvas, y, speed) {
    this.canvas = canvas;
    this.direction = 0;
    this.size = 20;
    this.x =  canvas.width + this.size;
    this.y = y;
    this.ctx = this.canvas.getContext('2d');
    this.speed = speed;
  }
  
  isInScreen () {
    return this.x + this.size / 2 > 0;
  };
  
  update () {
    this.x = this.x - this.speed;
  
    // todo prevent Enemy from moving outside of screen
  };
  
  draw () {
    this.ctx.fillStyle = 'red';
    const xPosition = this.x - this.size / 2;
    const yPosition = this.y - this.size / 2;
    this.ctx.fillRect(xPosition, yPosition , this.size, this.size);
  };
}

