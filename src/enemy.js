import GameObject from './gameObject';
import SpriteObject from "./spriteObject";
import { GAME_HEIGHT } from './index';
import BulletObject from './bulletObject';
import ExplosionObject from './explosionObject';

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
      x: spawnX,
      y: -170,
      width: 218,
      height: 169
    }
  }

  attemptToShoot() {
    if (Math.random() > 0.60) {
      const { x, y, width, height } = this.spriteObj;
      new BulletObject("enemyBullet", this.speed + 1.7, { x, y, width, height });
      this.canShoot = false;
    }
  }

  resetCount() {
    this.tickCount = 0;
  }

  move() {
    this.spriteObj.y += this.speed;
  }

  handleCollision() {
    ExplosionObject.createExplosion(this);
    GameObject.remove(this);
  }

  update(gameWidth, gameHeight) {
    super.update(gameWidth, gameHeight);

    if (this.collided) {
      this.handleCollision();
    };

    this.tickCount++;

    if (this.tickCount === this.tickCountLimit && this.canShoot) {
      this.attemptToShoot();
      this.tickCount = 0;
    }

    this.move();

    if (this.spriteObj.y > gameHeight + 10) GameObject.remove(this);
  }

  static spawn(spawnX) {
    return new Enemy(spawnX, Math.random() * (3 - 0.45) + 0.45);
  }

}