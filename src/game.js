import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
  }

  static get enemiesOnScreenLimit() {
    return 5;
  }

  update() {
    console.log(GameObject.all.length)
    if (GameObject.enemyCount <= Game.enemiesOnScreenLimit && Enemy.shouldSpawn()) {
      Enemy.spawn();
    }

    GameObject.all.forEach(obj => obj.update());
  }

  draw(ctx) {
    GameObject.all.forEach(obj => obj.draw(ctx));
  }
}