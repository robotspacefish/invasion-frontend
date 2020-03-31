import GameObject from './gameObject';
import BulletObject from './bulletObject';
import SpriteObject from './spriteObject';
import ExplosionObject from './explosionObject';
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { mid } from './utils';
import bark from './assets/audio/dog-bark-3.mp3';

export default class Player extends GameObject {
  constructor() {
    super();
    this.spriteObj = new SpriteObject(Player.initObj());
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

  static initObj() {
    return {
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 218,
      sourceHeight: 164,
      x: (GAME_WIDTH / 2) - (218 / 2 / 2),
      y: GAME_HEIGHT - 150,
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

  update() {
    super.update();

    if (this.collided) {
      ExplosionObject.createExplosion(this);
    }

    if (this.shoot) {
      this.shootAction();
      this.shoot = false;
    }

    this.move();
  }

  move() {
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
    this.keepInBounds();
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

  keepInBounds() {
    const { x, width } = this.spriteObj;
    if (x <= 0) this.spriteObj.x = 0;
    if (x + width >= GAME_WIDTH) this.spriteObj.x = GAME_WIDTH - this.spriteObj.width;
  }
}