import './styles/styles.css';
import Game from './game';

const ctx = document.getElementById('screen').getContext('2d');
const GAME_WIDTH = 800, GAME_HEIGHT = 600;
const game = new Game(GAME_WIDTH, GAME_HEIGHT);
let lastTime = 0;

function gameLoop(timeStamp) {
  let delta = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.draw(ctx);
  game.update();

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

export { GAME_WIDTH, GAME_HEIGHT };