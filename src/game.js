import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';
import Screen from './Screen';
import { GAME_WIDTH, GAME_HEIGHT } from './index';

export default class Game {
  constructor(width, height) {
    this.container = document.getElementById('game-content');
    this.ctx = document.getElementById('screen').getContext('2d');

    this.ctx.canvas.style.display = 'none'; // hide canvas
    this.width = width;
    this.height = height;

    this.player = new Player();

    this.mode = 'title';
    this.screens = this.initScreens();
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

  resize(containerId) {
    // const container = document.getElementById(containerId);
    let cWidth = window.innerWidth,
      cHeight = window.innerHeight;

    const nativeRatio = this.width / this.height,
      browserWindowRatio = cWidth / cHeight;

    if (browserWindowRatio > nativeRatio) {
      cWidth = (cHeight * 7) * nativeRatio;
    } else {
      cHeight = (cWidth * 7) / nativeRatio
    }

    this.ctx.canvas.width = `${cWidth}px`;
    this.ctx.canvas.height = `${cHeight}px`;
  }

  initScreens() {
    return {
      title: () => Screen.renderTitle(),
      gameOver: () => Screen.renderGameOver(this.container, this.player.points, this.wave)
    }
  }

  gameOver() {
    const player = GameObject.all.find(o => o.type === "player");

    this.mode = "gameOver";
    GameObject.remove(player);
  }

  update() {
    if (this.mode === "play") {
      if (GameObject.enemyCount === 0) {
        Game.spawnEnemyWave();
        this.wave++;
        // this.renderWaveUI();
      }

      GameObject.all.forEach(obj => obj.update());

      if (this.player.isHit) this.gameOver();
    }
  }

  draw() {
    if (this.mode === 'play') {
      this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      GameObject.all.forEach(obj => obj.draw(this.ctx));

    }

  }

  static renderScoreUI(points) {
    document.getElementById('score').innerHTML = `Score: ${points}`;
  }

  renderWaveUI() {
    document.getElementById('wave').innerHTML = `Wave: ${this.wave}`;
  }

  // renderCanvas() {

  //   this.container.innerHTML = `
  //     <div class="ui">
  //       <div id="score-bar">
  //         <div id="score">Score: ${this.player.points}</div>
  //         <div id="wave">Wave: </div>
  //       </div>
  //     </div>
  //     <div id="screen-bg">
  //       <canvas id="screen" width="${GAME_WIDTH}" height="${GAME_HEIGHT}"></canvas>
  //     </div>
  //   `;

  //   this.setContext();
  // }

  // createCanvas() {
  //   const canvas = document.createElement('canvas');
  //   canvas.id = 'screen';
  //   canvas.width = this.width;
  //   canvas.height = this.height;
  //   return canvas.getContext('2d');
  // }

  // setContext() {
  //   this.ctx = document.getElementById('screen').getContext('2d');
  // }
}