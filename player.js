'user strict';

function Player(canvas, lives) {
  var self = this;
  
  self.canvas = canvas;
  self.lives = lives;
  self.direction = 0;
  self.size = 50;
  self.x =  10 + self.size / 2;
  self.y = canvas.height / 2;
  self.ctx = self.canvas.getContext('2d');
  self.speed = 5;
  
}

Player.prototype.collided = function () {
  var self= this;

  self.lives--;
}

Player.prototype.collidesWithEnemy = function (enemy) {
  var self = this;

  const collidesRight = self.x + self.size / 2 > enemy.x - enemy.size / 2;
  const collidesLeft = self.x - self.size / 2 < enemy.x + enemy.size / 2;
  const collidesTop = self.y - self.size / 2 < enemy.y + enemy.size / 2;
  const collidesBottom = self.y + self.size / 2 > enemy.y - enemy.size / 2;

  if (collidesLeft && collidesRight && collidesTop && collidesBottom) {
    return true;
  }
  
  return false;
}


Player.prototype.setDirection = function (direction) {
  var self = this;

  self.direction = direction;
};

Player.prototype.update = function () {
  var self = this;

  self.y = self.y + self.direction * self.speed;

  if (self.y < 0){
    self.direction = 1;
  }

  if (self.y > self.canvas.height){
    self.direction = -1;
  }
};

Player.prototype.draw = function () {
  var self = this;

  self.ctx.fillStyle = 'blue';
  var xPosition = self.x - self.size / 2;
  var yPosition = self.y - self.size / 2;
  self.ctx.fillRect(xPosition, yPosition , self.size, self.size);
};