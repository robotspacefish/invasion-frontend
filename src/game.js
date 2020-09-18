import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';
import Screen from './Screen';


export default class Game {
  constructor(width, height) {
    this.container = document.getElementById('game-content');
    this.ctx = document.getElementById('screen').getContext('2d');
    this.width = width;
    this.height = height;
    this.ctx.canvas.width = this.width;
    this.ctx.canvas.height = this.height;

    this.player = new Player(this.width, this.height);

    this.mode = 'title';
    this.screens = this.initScreens();
    this.shouldUpdateUI = false;
    this.wave = 0;
  }

  // get maxWidth () {
  //   return window
  // }

  static get enemiesOnScreenLimit() {
    return 5;
  }

  get gapSize() {
    // 545 = 5 enemys at 218px/2 width
    // add 11px to the end to get last enemy to reach edge
    return Math.floor((this.width - 545) / 5) + 11
  }

  static spawnEnemyWave(game) {
    let spawnX = 5;
    while (GameObject.enemyCount < Game.enemiesOnScreenLimit) {
      const enemy = Enemy.spawn(spawnX);
      spawnX += enemy.spriteObj.width + game.gapSize;
    }
  }

  resize() {
    let cWidth = window.innerWidth,
      cHeight = window.innerHeight;

    const nativeRatio = this.width / this.height,
      browserWindowRatio = cWidth / cHeight;

    if (browserWindowRatio > nativeRatio) {
      cWidth = cHeight * nativeRatio;
    } else {
      cHeight = cWidth / nativeRatio
    }

    this.ctx.canvas.style.width = `${cWidth}px`;
    this.ctx.canvas.style.height = `${cHeight}px`;
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
        Game.spawnEnemyWave(this);
        this.wave++;
        // this.renderWaveUI();
      }

      GameObject.all.forEach(obj => obj.update(this.width, this.height));

      if (this.player.isHit) this.gameOver();
    }
  }

  draw() {
    if (this.mode === 'play') {
      this.ctx.clearRect(0, 0, this.width, this.height);
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