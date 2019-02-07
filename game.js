'use strict';

class Game{
  constructor() {
    this.gameIsOver = false;
    this.score = 0;
    this.pause = false;
    this.username = idName;
  }

  start () {
  
    this.gameMain = buildDom(`
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
  
    this.gameMain.querySelector('p').innerText = this.username;
    this.canvasParentElement = this.gameMain.querySelector('.canvas');
    this.canvasElement = this.gameMain.querySelector('canvas');
    this.music = this.gameMain.querySelector('audio');
    this.music.autoplay = true;
  
    this.livesElement = this.gameMain.querySelector('.lives .value');
    this.scoreElement = this.gameMain.querySelector('.score .value');
  
    document.body.appendChild(this.gameMain);
  
    this.width = this.canvasParentElement.offsetWidth;
    this.height = this.canvasParentElement.offsetHeight;
  
    this.canvasElement.setAttribute('width', this.width);
    this.canvasElement.setAttribute('height', this.height);
  
    this.player = new Player(this.canvasElement, 5);
  
    this.handleHeyDown = (event) => {
      if (event.key === 'ArrowUp'){
        this.player.setDirection(-1);
      } else if (event.key === 'ArrowDown'){
        this.player.setDirection(1);
      }
    };
  
    document.body.addEventListener('keydown', this.handleHeyDown)

    this.enemies = [];
    this.points = [];
    this.lives = [];
  
    this.startLoop();
  
    this.gameIsOver = false;
  };

  updateCanvas() {
    this.player.update();
  
      this.enemies.forEach(item => {
        item.update();
      });
  
      this.points.forEach(item => {
        item.update();
      });
  
      this.lives.forEach(item => {
        item.update();
      });
  }


  checkCollisions() {
    this.enemies = this.enemies.filter(item => {
      return item.isInScreen();
    });

    this.checkIfEnemiesCollidePlayer();
    this.checkIfPointsCollidePlayer();
    this.checkIfLivesCollidePlayer();
  }

  drawCanvas() {
    this.enemies.forEach(item => {
      item.draw()
    });

    this.points.forEach(item => {
      item.draw()
    });

    this.lives.forEach(item => {
      item.draw()
    });

    this.player.draw();
  }
  
  startLoop () {
    const ctx = this.canvasElement.getContext('2d');
  
    document.body.addEventListener('keyup', () => {
      if (event.key === ' ') {
        this.pause = !this.pause;
        if (!this.pause) {
            loop();
            this.music.play();
        }
        if (this.pause) {
          this.music.pause();
        };
      }
    });
  
     const loop = () => {
  
      if (Math.random() > 0.95){
        var y = this.canvasElement.height * Math.random();
        this.enemies.push(new Enemy(this.canvasElement, y , 5));
      }
  
      if (Math.random() > 0.99){
        var y = this.canvasElement.height * Math.random();
        this.points.push(new Points(this.canvasElement, y , 5));
      }
  
      if (Math.random() > 0.995){
        var y = this.canvasElement.height * Math.random();
        this.lives.push(new Live(this.canvasElement, y , 8));
      }
  
      this.updateCanvas();

      this.checkCollisions();
  
      this.livesElement.innerText = this.player.lives
      this.scoreElement.innerText = this.score;
  
      ctx.clearRect(0, 0, this.width, this.height) 
  
      this.drawCanvas();
      
      if(!this.gameIsOver && !this.pause) {
        window.requestAnimationFrame(loop);
      }
    };
    window.requestAnimationFrame(loop);
  };

  checkIfEnemiesCollidePlayer() {
    this.enemies.forEach( (item, index) => {
      if (this.player.collidesWithEnemy(item)) {
        this.player.collided();
        this.enemies.splice(index, 1);
        if (!this.player.lives) {
          this.gameOver();
        }
      }
    });
  };

  checkIfPointsCollidePlayer() {
    this.points.forEach((item, index) => {
      if (this.player.collidesWithEnemy(item)) {
        this.score ++;
        this.points.splice(index, 1);
      }
    });
  };

  checkIfLivesCollidePlayer() {
    this.lives.forEach( (item, index) => {
      if (this.player.collidesWithEnemy(item)) {
        this.player.collidedLive();
        this.lives.splice(index, 1);
      }
    });
  };

  onOver(callback) {
    this.onGameOverCallback = callback;
  };
  
  gameOver() {
    this.gameIsOver = true;
    this.onGameOverCallback();
  };
  
  destroy() {
    this.gameMain.remove();
  };
};





