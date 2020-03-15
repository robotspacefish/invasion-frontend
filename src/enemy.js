import GameObject from './gameObject';
import SpriteObject from "./spriteObject";
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { generateRandomNumber } from './utils';
import BulletObject from './bulletObject';
import ExplosionObject from './explosionObject';

export default class Enemy extends GameObject {
  constructor(speed = 1) {
    super();
    this.spriteObj = new SpriteObject(Enemy.initObj());
    this.speed = speed;
    this.type = "enemy"
    this.count = 0;  // fire every time count hits countLimit
    this.countLimit = 150;
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

  shoot() {
    const { x, y, width, height } = this.spriteObj;
    new BulletObject("enemyBullet", this.speed + 0.6, { x, y, width, height });
    this.resetCount();
  }

  resetCount() {
    this.count = 0;
  }

  update() {
    super.update();
    this.count++;

    this.spriteObj.y += this.speed;

    if (this.count === this.countLimit) this.shoot();

    if (this.collided) {
      ExplosionObject.createExplosion(this);
      GameObject.remove(this);
    };

    if (this.spriteObj.y > GAME_HEIGHT + 10) GameObject.remove(this);
  }

  static shouldSpawn() {
    return Math.random() < Enemy.frequency
  }

  static spawn() {
    new Enemy(Math.random() * (3 - 0.45) + 0.45);
  }
}