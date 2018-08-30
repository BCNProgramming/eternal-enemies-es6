'user strict';

function Enemy(canvas, y, speed) {
  var self = this;
  
  self.canvas = canvas;
  self.direction = 0;
  self.size = 20;
  self.x =  canvas.width + self.size;
  self.y = y;
  self.ctx = self.canvas.getContext('2d');
  self.speed = speed;
  
}


Enemy.prototype.isInScreen = function () {
  var self = this;
  return self.x + self.size / 2 > 0;
};

Enemy.prototype.update = function () {
  var self = this;
  self.x = self.x - self.speed;

  // todo prevent Enemy from moving outside of screen
};

Enemy.prototype.draw = function () {
  var self = this;
  self.ctx.fillStyle = 'red';
  var xPosition = self.x - self.size / 2;
  var yPosition = self.y - self.size / 2;
  self.ctx.fillRect(xPosition, yPosition , self.size, self.size);
};