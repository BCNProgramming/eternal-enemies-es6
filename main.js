'use strict';

let idName;

const  buildDom = html => {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

const main = () => {

  let splashMain;
  let gameOverMain;

  let game; // instance of Game
  

  // -- splash

 const buildSplash = () => {

    splashMain = buildDom(`
      <main>
        <h1>Eternal Enemies</h1>
        <div>
          <label>Username:</label>
          <input type="text" placeholder="Who do you hate most"></input>
        </div>
        <button>Start</button>
      </main>
    `);
    
    document.body.appendChild(splashMain);

    const input = document.querySelector('input');

    input.addEventListener('keyup', function (){
        idName = username(input);
    })
    const username = item => {
      return item.value;
    };

    const button = splashMain.querySelector('button');
    button.addEventListener('click', startGame);

  }

  const destoySplash = () => {
    splashMain.remove();
  }

  
  // -- game

  const startGame = () => {
    destoySplash();
    destoyGameOver();

    game = new Game();
    game.start();
    game.onOver(() => {
      gameOver(game.score, game.username);
    });
  }

  const destroyGame = () => {
    game.destroy();
  }

  // -- game over 


  const gameOver = (score, username) => {
    destroyGame();
    buildGameOver(score, username);
  }

  const buildGameOver = (score, username) =>  {

    gameOverMain = buildDom(`
      <main>
        <h1>Game over</h1>
        <p><span></span></p>
        <button>Restart</button>
      </main>
    `);

    const button = gameOverMain.querySelector('button');
    button.addEventListener('click', startGame);    
    
    const span = gameOverMain.querySelector('span');
    span.innerText = username+' your score is: ' + score + ' !!!!';

    document.body.appendChild(gameOverMain);
  }

  const destoyGameOver = () => {
    if (gameOverMain) {
      gameOverMain.remove();
    }
  }

  // -- initialize

  buildSplash();
}

window.addEventListener('load', main);