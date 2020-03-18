import './styles/styles.css';
import UsersAdapter from './user/usersAdapter';
import LeaderboardAdapter from './leaderboard/leaderboardAdapter';
import Game from './game';
import GameObject from './gameObject';

const usersScoreDiv = document.getElementById('users-scores');
const leaderboardDiv = document.getElementById('leaderboard-scores');

const GAME_WIDTH = 800, GAME_HEIGHT = 500;
let game;
let lastTime = 0;

function handleFormSubmit(e, score) {
  e.preventDefault();
  const usernameFromInput = e.target.parentNode.children[0].value.toLowerCase();
  if (usernameFromInput !== "") UsersAdapter.addNewUser(usernameFromInput, score);
}

function gameLoop() {
  if (game.mode === "gameOver") {
    game.screens.gameOver()
  } else {
    if (game.mode === "play") {
      game.draw();
      game.update();
    }

    requestAnimationFrame(gameLoop);
  }
}

window.addEventListener('keydown', (e) => {
  if (game.mode === "title") {
    if (e.code === "Space") {
      game.mode = "play";
      game.renderCanvas();
    }
  } else if (game.mode === "play") {
    if (!e.repeat) {
      if (e.key === 'ArrowRight') game.player.moveRight = true;
      if (e.key === 'ArrowLeft') game.player.moveLeft = true;
      if (e.code === "Space") game.player.shoot = true;
    }
  }
  if (e.target.nodeName === "BODY") e.preventDefault(); // prevent scrolling browser
});

function init() {
  GameObject.all = [];
  game = new Game(GAME_WIDTH, GAME_HEIGHT);
  game.mode = "title";
  requestAnimationFrame(gameLoop);
}

function start() {
  fetchData(leaderboardDiv, usersScoreDiv);
  init();
  game.screens.title();

}

function reset() {
  init();
  game.mode = "play";
  game.renderCanvas();
}

function fetchData(leaderboardDiv, usersScoreDiv) {
  LeaderboardAdapter.fetchLeaderboard(leaderboardDiv);
  UsersAdapter.fetchUsers(usersScoreDiv);
}

start();

export { GAME_WIDTH, GAME_HEIGHT, start, reset, handleFormSubmit, usersScoreDiv, leaderboardDiv };