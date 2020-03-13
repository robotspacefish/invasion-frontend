import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
  }

  update() {
    if (Enemy.shouldSpawn()) Enemy.spawn();
    GameObject.all.forEach(obj => obj.update());
  }

  draw(ctx) {
    GameObject.all.forEach(obj => obj.draw(ctx));
  }
}