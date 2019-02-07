'user strict';

class Player {
  constructor(canvas, lives) {
    this.canvas = canvas;
    this.lives = lives;
    this.direction = 0;
    this.size = 50;
    this.x =  10 + this.size / 2;
    this.y = canvas.height / 2;
    this.ctx = this.canvas.getContext('2d');
    this.speed = 5;
  }
  
  collided () {
    this.lives--;
  }
  
  collidedLive () {
    this.lives++;
  }
  
  collidesWithEnemy (enemy) {  
    const collidesRight = this.x + this.size / 2 > enemy.x - enemy.size / 2;
    const collidesLeft = this.x - this.size / 2 < enemy.x + enemy.size / 2;
    const collidesTop = this.y - this.size / 2 < enemy.y + enemy.size / 2;
    const collidesBottom = this.y + this.size / 2 > enemy.y - enemy.size / 2;
  
    if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
      return true;
    }
    
    return false;
  }
  
  
  setDirection (direction) {  
    this.direction = direction;
  };
  
  update () {  
    this.y = this.y + this.direction * this.speed;
  
    if (this.y < 0){
      this.direction = 1;
    }
  
    if (this.y > this.canvas.height){
      this.direction = -1;
    }
  };
  
  draw () {  
    this.ctx.fillStyle = 'blue';
    const xPosition = this.x - this.size / 2;
    const yPosition = this.y - this.size / 2;
    this.ctx.fillRect(xPosition, yPosition , this.size, this.size);
  };
}
