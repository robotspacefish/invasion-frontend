import GameObject from './gameObject';
import SpriteObject from "./spriteObject";
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { generateRandomNumber } from './utils';
import BulletObject from './bulletObject';
import ExplosionObject from './explosionObject';
import Game from './game';

export default class Enemy extends GameObject {
  constructor(spawnX, speed = 1) {
    super();
    this.spriteObj = new SpriteObject(Enemy.initObj(spawnX));
    this.speed = speed;
    this.type = "enemy"
    this.tickCount = 0;
    this.tickCountLimit = 70;
    this.canShoot = true;
  }

  static initObj(spawnX) {
    return {
      sourceX: 0,
      sourceY: 176,
      sourceWidth: 218,
      sourceHeight: 169,
      // x: generateRandomNumber(0, GAME_WIDTH - 169),
      x: spawnX,
      y: -170,
      width: 218 / 2,
      height: 169 / 2
    }
  }

  static get frequency() {
    return 0.005;
  }

  attemptToShoot() {
    if (Math.random() > 0.60) {
      const { x, y, width, height } = this.spriteObj;
      new BulletObject("enemyBullet", this.speed + 0.6, { x, y, width, height });
      this.canShoot = false;
    }
  }

  resetCount() {
    this.tickCount = 0;
  }

  update() {
    super.update();
    this.tickCount++;

    if (this.tickCount === this.tickCountLimit && this.canShoot) {
      this.attemptToShoot();
    }

    this.spriteObj.y += this.speed;

    if (this.collided) {
      ExplosionObject.createExplosion(this);
      GameObject.remove(this);
    };

    if (this.spriteObj.y > GAME_HEIGHT + 10) GameObject.remove(this);
  }

  static shouldSpawn() {
    return Math.random() < Enemy.frequency
  }

  static spawn(spawnX) {
    return new Enemy(spawnX, Math.random() * (3 - 0.45) + 0.45);
  }

}