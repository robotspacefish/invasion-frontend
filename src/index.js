import UsersAdapter from './user/usersAdapter';
import LeaderboardAdapter from './leaderboard/leaderboardAdapter';
import Game from './game';
import GameObject from './gameObject';
import { buildBackground } from './background';
import Screen from './Screen';
import './styles/styles.css';

let isMobile = !!(navigator.userAgent.toLowerCase().match(/mobile/i) || navigator.userAgent.toLowerCase().match(/tablet/i) || navigator.userAgent.toLowerCase().match(/android/i) || navigator.userAgent.toLowerCase().match(/iphone/i) || navigator.userAgent.toLowerCase().match(/ipad/i));

let highestScores;

let gameHeight = 600, gameWidth = 800; // 4:3

const usersScoreDiv = document.getElementById('users-scores');
const leaderboardDiv = document.getElementById('leaderboard-scores');

const bgCtx = document.getElementById('screen-bg').getContext('2d');
let game;
let RAF;

function handleFormSubmit(e, score) {
  e.preventDefault();
  const usernameFromInput = e.target.parentNode.children[0].value.toLowerCase();
  if (usernameFromInput !== "") UsersAdapter.addNewUser(usernameFromInput, score);
}

window.addEventListener('keydown', (e) => {
  if (game.mode === "title") {
    if (e.code === "Space") {
      game.mode = "play";
      RAF = requestAnimationFrame(gameLoop);
      Screen.showCanvas(game.ctx.canvas);
    }
  } else if (game.mode === "play") {

    let k = e.keyCode;
    // Right (right / D)
    if (k === 39 || k === 68) game.player.moveRight = true;

    // Left (left / A / Q)
    else if (k === 37 || k === 65 || k === 81) game.player.moveLeft = true;

    // Up (up / W / Z)
    else if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) game.player.pBombShoot = true; // TODO future feature

    // Space
    else if (k === 32) {
      if (!game.player.isBarkCooldown) {
        game.player.shoot = true;
        game.player.isBarkCooldown = true;
        setTimeout(() => {
          game.player.isBarkCooldown = false;
        }, 1300)
      }

    }

  }
  if (e.target.nodeName === "BODY") e.preventDefault(); // prevent scrolling browser
});

window.addEventListener('keyup', (e) => {
  if (game.mode === "play") {
    let k = e.keyCode;

    // Right (right / D)
    if (k === 39 || k === 68) game.player.moveRight = false;

    // Left (left / A / Q)
    else if (k === 37 || k === 65 || k === 81) game.player.moveLeft = false;

    // Up (up / W / Z)
    else if (e.keyCode == 38 || e.keyCode == 90 || e.keyCode == 87) game.player.pBombShoot = false;

    // Space
    else if (k === 32) game.player.shoot = false;
  }
});

window.addEventListener('load', () => {
  start();
  game.resize();

  window.addEventListener('resize', () => {
    game.resize();
  }, false)

})

function init() {
  GameObject.all = [];

  game = new Game(gameWidth, gameHeight);
  game.mode = "title";
}

function fetchData() {
  LeaderboardAdapter.fetchLeaderboard().then((data) => {
    highestScores = [...data.highestScoringUsers];

  });
}

function gameLoop() {
  // continues to loop if mode !== gameOver
  // if (game.mode === 'title') {
  //   cancelAnimationFrame(RAF);
  //   // Screen.drawTitle();
  //   Screen.hideCanvas(game.ctx.canvas);
  // }
  if (game.mode === "gameOver") {
    Screen.hideCanvas(game.ctx.canvas);
    cancelAnimationFrame(RAF);
    game.screens.gameOver(highestScores)
  } else {
    if (game.mode === "play") {
      game.draw();
      game.update();
      RAF = requestAnimationFrame(gameLoop);
    }

  }
}

function reset() {
  init();
  game.mode = "play";
  RAF = requestAnimationFrame(gameLoop);
  Screen.showCanvas(game.ctx.canvas);
}

function start() {
  fetchData();
  init();
  buildBackground(bgCtx)
  Screen.hideCanvas(game.ctx.canvas);
  game.screens.title();


}

export { start, reset, handleFormSubmit, usersScoreDiv, leaderboardDiv };