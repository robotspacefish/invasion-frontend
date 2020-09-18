import GameObject from './gameObject';
import BulletObject from './bulletObject';
import SpriteObject from './spriteObject';
import ExplosionObject from './explosionObject';
import { mid } from './utils';
import bark from './assets/audio/dog-bark-3.mp3';

export default class Player extends GameObject {
  constructor(gameWidth, gameHeight) {
    super();
    this.spriteObj = new SpriteObject(Player.initObj(gameWidth, gameHeight));
    this.dx = 0;
    this.dxMax = 25; // speed limit
    this.acceleration = 2; // how much is added to movement
    this.moveLeft = false;
    this.moveRight = false;
    this.shoot = false;
    this.shootSound = new Audio(bark);
    this.type = "player";
    this.points = 0;
    this.isHit = false;
  }

  static initObj(gameWidth, gameHeight) {
    return {
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 218,
      sourceHeight: 164,
      x: (gameWidth / 2) - (218 / 2 / 2),
      y: gameHeight - 164 / 2 - 60,
      width: 218 / 2,
      height: 164 / 2
    }
  }

  static get friction() {
    return 0.98; // slow player movement
  }

  addPoint() {
    this.points++;
  }

  update(gameWidth) {
    super.update(gameWidth);

    if (this.collided) {
      ExplosionObject.createExplosion(this);
    }

    if (this.shoot) {
      this.shootAction();
      this.shoot = false;
    }

    this.move(gameWidth);
  }

  move(gameWidth) {
    this.dx *= Player.friction;

    if (this.moveLeft) {
      this.moveLeftAction();
      this.moveLeft = false;
    }

    if (this.moveRight) {
      this.moveRightAction();
      this.moveRight = false;
    }

    // keep within speed limit
    this.dx = mid(-this.dxMax, this.dx, this.dxMax);

    this.spriteObj.x += this.dx;
    this.keepInBounds(gameWidth);
  }

  moveLeftAction() {
    this.dx -= this.acceleration;
  }

  moveRightAction() {
    this.dx += this.acceleration;
  }

  shootAction() {
    const { x, y, width, height } = this.spriteObj, speed = 30;
    new BulletObject("playerBullet", speed, { x, y, width, height });
    this.shootSound.play();
  }

  keepInBounds(gameWidth) {
    const { x, width } = this.spriteObj;
    if (x <= 0) this.spriteObj.x = 0;
    if (x + width >= gameWidth) this.spriteObj.x = gameWidth - this.spriteObj.width;
  }
}