import GameObject from './gameObject';
import SpriteObject from "./spriteObject";
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { generateRandomNumber } from './utils';
import ExplosionObject from './explosionObject';

export default class Enemy extends GameObject {
  constructor(speed = 0.45) {
    super();
    this.spriteObj = new SpriteObject(Enemy.initObj());
    this.speed = speed;
    this.type = "enemy"
  }

  static initObj() {
    return {
      sourceX: 0,
      sourceY: 176,
      sourceWidth: 218,
      sourceHeight: 169,
      x: generateRandomNumber(0, GAME_WIDTH - 169),
      y: -170,
      width: 218 / 2,
      height: 169 / 2
    }
  }

  static get frequency() {
    return 0.005;
  }

  update() {
    super.update();

    this.spriteObj.y += this.speed;

    if (this.collided) {
      new ExplosionObject(this);
      GameObject.remove(this);
    };

    if (this.spriteObj.y > GAME_HEIGHT + 10) GameObject.remove(this);
  }

  static shouldSpawn() {
    return Math.random() < Enemy.frequency
  }

  static spawn() {
    new Enemy();
  }

}

// setInterval(() => {
//   Enemy.spawn();
// }, 1000)