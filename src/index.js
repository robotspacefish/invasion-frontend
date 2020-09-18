import UsersAdapter from './user/usersAdapter';
import LeaderboardAdapter from './leaderboard/leaderboardAdapter';
import Game from './game';
import GameObject from './gameObject';
import { buildBackground } from './background';
import Screen from './Screen';
import './styles/styles.css';

let isMobile = !!(navigator.userAgent.toLowerCase().match(/mobile/i) || navigator.userAgent.toLowerCase().match(/tablet/i) || navigator.userAgent.toLowerCase().match(/android/i) || navigator.userAgent.toLowerCase().match(/iphone/i) || navigator.userAgent.toLowerCase().match(/ipad/i));

let gameHeight = window.innerHeight, gameWidth = window.innerWidth;

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
  console.log(game.mode)
  if (game.mode === "title") {
    if (e.code === "Space") {
      game.mode = "play";
      RAF = requestAnimationFrame(gameLoop);
      Screen.showCanvas(game.ctx.canvas);
    }
  } else if (game.mode === "play") {
    if (!e.repeat) {
      if (e.key === 'ArrowRight') game.player.moveRight = true;
      if (e.key === 'ArrowLeft') game.player.moveLeft = true;
      if (e.code === "Space") game.player.shoot = true;
    }
  }

  console.log(game.mode)
  if (e.target.nodeName === "BODY") e.preventDefault(); // prevent scrolling browser
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

function fetchData(leaderboardDiv, usersScoreDiv) {
  UsersAdapter.fetchUsers(usersScoreDiv);
  LeaderboardAdapter.fetchLeaderboard(leaderboardDiv);
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
    game.screens.gameOver()
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
  game.renderCanvas();
}

function start() {
  // fetchData(leaderboardDiv, usersScoreDiv);
  init();
  buildBackground(bgCtx)
  Screen.hideCanvas(game.ctx.canvas);
  game.screens.title();


}

export { start, reset, handleFormSubmit, usersScoreDiv, leaderboardDiv };