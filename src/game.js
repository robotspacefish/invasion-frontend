import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';
import Screen from './Screen';

const cooldownText = '[COOLING DOWN]';

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
    this.pBombs = 3; // TODO future feature
    this.isBarkCooldown = false;
  }

  static get enemiesOnScreenLimit() {
    return 5;
  }

  get gapSize() {
    // 545 = 5 enemys at 218px/2 width
    // add 11px to the end to get last enemy to reach edge
    return Math.floor((this.width - 545) / 5) + 10
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
      cHeight = Math.floor(cHeight * 0.9);
      cWidth = Math.floor(cHeight * nativeRatio);
    } else {
      cWidth = Math.floor(cWidth * 0.9);
      cHeight = Math.floor(cWidth / nativeRatio)
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
      }

      GameObject.all.forEach(obj => obj.update(this.width, this.height));

      if (this.player.isHit) this.gameOver();
    }
  }

  draw() {
    if (this.mode === 'play') {
      this.ctx.clearRect(0, 0, this.width, this.height);

      GameObject.all.forEach(obj => obj.draw(this.ctx));

      this.renderUI();
    }
  }

  renderUI() {
    this.ctx.fillStyle = 'white';
    this.ctx.font = '20px monospace'
    this.ctx.fillText(`Score: ${this.player.points} Wave: ${this.wave}`, 5, this.height - 10)


    if (this.player.isBarkCooldown) {
      this.ctx.fillStyle = 'red';
      const textWidth = this.ctx.measureText(cooldownText).width;
      this.ctx.fillText(cooldownText, this.width / 2 - textWidth / 2, this.height - 10)
    }
    // this.ctx.fillText(`P-Bombs: ${this.pBombs}`, this.width - 125, this.height - 10)
  }
}