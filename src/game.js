import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
    this.player.renderScore();
  }

  static get enemiesOnScreenLimit() {
    return 5;
  }

  update() {
    if (GameObject.enemyCount <= Game.enemiesOnScreenLimit && Enemy.shouldSpawn()) {
      Enemy.spawn();
    }

    GameObject.all.forEach(obj => obj.update());

    if (this.player.isHit) {
      alert('game over')
      // game over
      // show score
      // allow player to enter name
    }
  }

  draw(ctx) {
    GameObject.all.forEach(obj => obj.draw(ctx));
  }
}