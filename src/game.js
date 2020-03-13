import Player from './player';
import Enemy from './enemy';
import GameObject from './gameObject';

export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
  }

  static get gravity() {
    return 0.75;
  }

  update() {
    if (Enemy.shouldSpawn()) {
      // TODO adjust spawn spacing and timing
      setTimeout(Enemy.spawn(), 3000)
    }
    GameObject.all.forEach(obj => obj.update(Game.gravity));
  }

  draw(ctx) {
    GameObject.all.forEach(obj => obj.draw(ctx));
  }
}