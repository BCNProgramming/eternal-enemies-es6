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
      <div>
        <audio id='song' preload="auto" loop
        src="./audio/Stage 1 Castlevania (NES) Music.mp3" type="audio/ogg">
        </audio>
        <div>
          <button onclick="document.getElementById('song').play()">Play</button>
          <button onclick="document.getElementById('song').pause()">Pause</button>
        </div>
      </div>
      </main>
  `);

  self.gameMain.querySelector('p').innerText = self.username;
  self.canvasParentElement = self.gameMain.querySelector('.canvas');
  self.canvasElement = self.gameMain.querySelector('canvas');
  self.music = self.gameMain.querySelector('audio');
  self.music.autoplay = true;

  self.livesElement = self.gameMain.querySelector('.lives .value');
  self.scoreElement = self.gameMain.querySelector('.score .value');

  document.body.appendChild(self.gameMain);

  self.width = self.canvasParentElement.offsetWidth;
  self.height = self.canvasParentElement.offsetHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);


  self.player = new Player(self.canvasElement, 5);


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
  self.lives = [];

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
          self.music.play();
      }
      if (self.pause) {
        self.music.pause();
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

    if (Math.random() > 0.995){
      var y = self.canvasElement.height * Math.random();
      self.lives.push(new Live(self.canvasElement, y , 8));
    }


    // UPDATE


    self.player.update();

    self.enemies.forEach(function(item) {
      item.update();
    });

    self.points.forEach(function(item) {
      item.update();
    });

    self.lives.forEach(function(item) {
      item.update();
    });

    self.enemies = self.enemies.filter(function (item){
      return item.isInScreen();
    });

    self.checkIfEnemiesCollidePlayer();
    self.checkIfPointsCollidePlayer();
    self.checkIfLivesCollidePlayer();

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

    self.lives.forEach(function(item) {
      item.draw()
    });

    self.player.draw();
    
    if(!self.gameIsOver && !self.pause) {
      window.requestAnimationFrame(loop);
    }
  };
  window.requestAnimationFrame(loop);
};



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

Game.prototype.checkIfLivesCollidePlayer = function () {
  var self = this;
  self.lives.forEach( function(item, index) {
  if (self.player.collidesWithEnemy(item)) {
    self.player.collidedLive();
    self.lives.splice(index, 1);
  }
});
};

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
};

Game.prototype.gameOver = function () {
  var self = this;

  self.gameIsOver = true;
  self.onGameOverCallback();
};

Game.prototype.destroy = function () {
  var self = this;
  self.gameMain.remove();
};
