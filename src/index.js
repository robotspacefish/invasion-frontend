import './styles/styles.css';
import Game from './game';
const ctx = document.getElementById('screen').getContext('2d');
const GAME_WIDTH = 800, GAME_HEIGHT = 600;
const game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw(ctx);
  game.update(deltaTime);

  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') game.player.moveRight = true;
  if (e.key === 'ArrowLeft') game.player.moveLeft = true;
  if (e.code === "Space") game.player.shoot = true;

  e.preventDefault(); // prevent scrolling browser
});

requestAnimationFrame(gameLoop);

export { GAME_WIDTH, GAME_HEIGHT };