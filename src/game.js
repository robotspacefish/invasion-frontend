import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';
import TitleScreen from './titleScreen';
import { GAME_WIDTH, GAME_HEIGHT } from './index';

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
    this.container = document.getElementById('game-content');
    this.mode = "title";
    this.screens = this.initScreens();
    this.ctx;
    this.shouldUpdateUI = false;
    this.wave = 1;
  }

  static get enemiesOnScreenLimit() {
    return 5;
  }

  static spawnEnemyWave() {
    let spawnX = 0;
    while (GameObject.enemyCount < Game.enemiesOnScreenLimit) {
      const enemy = Enemy.spawn(spawnX);
      spawnX += enemy.spriteObj.width + 60;
    }

    console.log(GameObject.all)
  }

  initScreens() {
    return {
      title: new TitleScreen(this.container),
      // gameOver: new GameOverScreen(this.container)
    }
  }

  update() {
    if (this.mode === "play") {
      if (GameObject.enemyCount === 0) {
        Game.spawnEnemyWave();
      }

      GameObject.all.forEach(obj => obj.update());

      if (this.player.isHit) {
        console.log('game over')
        // game over
        // show score
        // allow player to enter name
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    if (this.mode === "play") {
      GameObject.all.forEach(obj => obj.draw(this.ctx));
    }
  }

  static renderScore(points) {
    document.getElementById('score-bar').innerHTML = points;
  }

  renderCanvas() {
    this.container.innerHTML = `
      <div class="ui">
        <div id="score-bar">
          ${this.player.points}
        </div>
      </div>
      <div id="screen-bg">
        <canvas id="screen" width="800" height="600"></canvas>
      </div>
    `;

    this.setContext();
  }

  setContext() {
    this.ctx = document.getElementById('screen').getContext('2d');
  }
}