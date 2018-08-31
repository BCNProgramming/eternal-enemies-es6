'use strict';

function Game() {
  var self = this;

  self.gameIsOver = false;
  self.score = 0;
  self.pause = false;
  self.username = idName;
}

Game.prototype.start = function () {
  var self = this;

  self.gameMain = buildDom(`
    <main class="game container">
      <header>
        <div class="lives">
          <span class="label">Lives:</span>
          <span class="value"></span>
        </div>
        <div>
          <p></p>
        </div>
        <div class="score">
          <span class="label">Score:</span>
          <span class="value"></span>
        </div>
      </header>
      <div class="canvas">
        <canvas></canvas>
      </div>
    </main>
  `);

  self.gameMain.querySelector('p').innerText = self.username;
  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');

  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.scoreElement = self.gameMain.querySelector('.score .value');

  document.body.appendChild(self.gameMain);

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);


  self.player = new Player(self.canvasElement, 5);
  // self.player.lives = 3;


  self.handleHeyDown = function (event) {
    if (event.key === 'ArrowUp'){
      self.player.setDirection(-1);
    } else if (event.key === 'ArrowDown'){
      self.player.setDirection(1);
    }
  };

  document.body.addEventListener('keydown', self.handleHeyDown)



  self.enemies = [];
  self.points = [];

  self.startLoop();

  self.gameIsOver = false;

};


Game.prototype.startLoop = function () {
  self = this;
  var ctx = self.canvasElement.getContext('2d');

  document.body.addEventListener('keyup', function(){
    if (event.key === ' ') {
      self.pause = !self.pause;
      if (!self.pause) {
          loop();
      };
    }
  });

  function loop(){

    if (Math.random() > 0.95){
      var y = self.canvasElement.height * Math.random();
      self.enemies.push(new Enemy(self.canvasElement, y , 5));
    }

    if (Math.random() > 0.99){
      var y = self.canvasElement.height * Math.random();
      self.points.push(new Points(self.canvasElement, y , 5));
    }


    // UPDATE


    self.player.update();

    self.enemies.forEach(function(item) {
      item.update();
    });

    self.points.forEach(function(item) {
      item.update();
    });

    self.enemies = self.enemies.filter(function (item){
      return item.isInScreen();
    });

    self.checkIfEnemiesCollidePlayer();
    self.checkIfPointsCollidePlayer();

    self.livesElement.innerText = self.player.lives
    self.scoreElement.innerText = self.score;

    ctx.clearRect(0, 0, self.width, self.height) 


    // DRAW


    self.enemies.forEach(function(item) {
      item.draw()
    });

    self.points.forEach(function(item) {
      item.draw()
    });

    self.player.draw();
    
    if(!self.gameIsOver && !self.pause) {
      window.requestAnimationFrame(loop);
    }
  };
  window.requestAnimationFrame(loop);
};


Game.prototype.togglePause = function () {
  var self = this;
  if (!self.pause) {
        self.pause = true;
  } else {
       self.pause = false;
  };
}

Game.prototype.checkIfEnemiesCollidePlayer = function () {
  var self = this;

  self.enemies.forEach( function(item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.player.collided();
      self.enemies.splice(index, 1);
      if (!self.player.lives) {
        self.gameOver();
      }
    }
  });
};

Game.prototype.checkIfPointsCollidePlayer = function () {
    var self = this;
    self.points.forEach( function(item, index) {
    if (self.player.collidesWithEnemy(item)) {
      self.score ++;
      self.points.splice(index, 1);
    }
  });
};

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function (callback) {
  var self = this;

  self.gameIsOver = true;
  self.onGameOverCallback();
};

Game.prototype.destroy = function () {
  var self = this;
  
  self.gameMain.remove();
};
