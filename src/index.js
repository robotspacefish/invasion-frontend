import './styles/styles.css';
import { UsersAdapter } from './user/usersAdapter';
import { LeaderboardAdapter } from './leaderboard/leaderboardAdapter';
import Game from './game';
import GameObject from './gameObject';

const GAME_WIDTH = 800, GAME_HEIGHT = 500;
let game = new Game(GAME_WIDTH, GAME_HEIGHT);
let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  if (game.mode === "gameOver") {
    game.screens.gameOver()
  } else {
    if (game.mode === "play") {
      game.draw();
      game.update(deltaTime);
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
    if (e.key === 'ArrowRight') game.player.moveRight = true;
    if (e.key === 'ArrowLeft') game.player.moveLeft = true;
    if (e.code === "Space") game.player.shoot = true;
  }

  e.preventDefault(); // prevent scrolling browser
});

function start() {
  game.screens.title();
  // game.screens.gameOver()
  requestAnimationFrame(gameLoop);
}


LeaderboardAdapter.fetchLeaderboard(document.getElementById('leaderboard-scores'));
UsersAdapter.fetchUsers(document.getElementById('users-scores'));

start();
export { GAME_WIDTH, GAME_HEIGHT, reset };