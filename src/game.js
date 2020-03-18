import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';
import Screen from './Screen';
import { GAME_WIDTH, GAME_HEIGHT } from './index';

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
    this.container = document.getElementById('game-content');
    this.mode;
    this.screens = this.initScreens();
    this.ctx;
    this.shouldUpdateUI = false;
    this.wave = 0;
  }

  static get enemiesOnScreenLimit() {
    return 5;
  }

  static spawnEnemyWave() {
    let spawnX = 5;
    while (GameObject.enemyCount < Game.enemiesOnScreenLimit) {
      const enemy = Enemy.spawn(spawnX);
      spawnX += enemy.spriteObj.width + 60;
    }
  }

  initScreens() {
    return {
      title: () => Screen.renderTitle(this.container),
      gameOver: () => Screen.renderGameOver(this.container, this.player.points, this.wave)
    }
  }

  gameOver() {
    const player = GameObject.all.find(o => o.type === "player");

    this.mode = "gameOver"
    GameObject.remove(player);
  }

  update() {
    if (this.mode === "play") {
      if (GameObject.enemyCount === 0) {
        Game.spawnEnemyWave();
        this.wave++;
        this.renderWaveUI();
      }

      GameObject.all.forEach(obj => obj.update());

      if (this.player.isHit) this.gameOver();
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    if (this.mode === "play") {
      GameObject.all.forEach(obj => obj.draw(this.ctx));
    }
  }

  static renderScoreUI(points) {
    document.getElementById('score').innerHTML = `Score: ${points}`;
  }

  renderWaveUI() {
    document.getElementById('wave').innerHTML = `Wave: ${this.wave}`;
  }

  renderCanvas() {
    this.container.innerHTML = `
      <div class="ui">
        <div id="score-bar">
          <div id="score">Score: ${this.player.points}</div>
          <div id="wave">Wave: </div>
        </div>
      </div>
      <div id="screen-bg">
        <canvas id="screen" width="${GAME_WIDTH}" height="${GAME_HEIGHT}"></canvas>
      </div>
    `;

    this.setContext();
  }

  setContext() {
    this.ctx = document.getElementById('screen').getContext('2d');
  }
}