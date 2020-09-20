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
    this.pBombShoot = false; // TODO future feature
    this.pBombActive = false;
    this.pBomb;
    this.pBombs = 3;
    this.pBombIntervalId;
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
      y: gameHeight - 164 / 2 - 30,
      width: 218 / 2,
      height: 164 / 2
    }
  }

  static get friction() {
    return 0.75; // slow player movement
  }

  addPoint() {
    this.points++;
  }

  update(gameWidth, gameHeight) {
    super.update(gameWidth, gameHeight);

    if (this.collided) {
      ExplosionObject.createExplosion(this);
    }

    if (this.shoot) {
      this.shootAction();
      this.shoot = false;
    }

    if (this.pBombShoot) {
      this.pBombShootAction(gameWidth, gameHeight);
      this.pBombShoot = false;
    }

    if (this.pBombActive) {
      if (this.pBomb.spriteObj.x + this.pBomb.spriteObj.width < 0) {
        this.stopPBomb();
      }
    }

    this.move(gameWidth);
  }

  stopPBomb() {
    GameObject.remove(this.pBomb);
    this.pBomb = null;
    this.clearPBombInterval();
    this.pBombActive = false;
  }

  clearPBombInterval() {
    clearInterval(this.pBombIntervalId);
  }

  move(gameWidth) {
    this.dx *= Player.friction;
    if (this.moveLeft && !this.moveRight) this.dx -= this.acceleration;
    if (this.moveRight && !this.moveLeft) this.dx += this.acceleration;

    // if (!this.moveRight && !this.moveLeft) this.dx = 0;

    // keep within speed limit
    // this.dx = (mid(-this.dxMax, this.dx, this.dxMax) * Player.friction);

    this.spriteObj.x += this.dx;

    if (this.type !== "pBomb") this.keepInBounds(gameWidth);
  }


  shootAction() {
    const { x, y, width, height } = this.spriteObj, speed = 30;
    new BulletObject("playerBullet", speed, { x, y, width, height });
    this.shootSound.play();
  }

  pBombShootAction(gameWidth, gameHeight) {
    // create
    this.pBombs--;
    this.pBomb = new Player(gameWidth, gameHeight);
    this.pBomb.spriteObj.sourceX = 224;
    this.pBomb.spriteObj.sourceWidth = 219;
    this.pBomb.spriteObj.sourceHeight = 157;
    this.pBomb.spriteObj.x = gameWidth + 219;
    this.pBomb.spriteObj.y = gameHeight - 157 / 2 - 30;
    this.pBomb.spriteObj.width = 219 / 2;
    this.pBomb.spriteObj.height = 157 / 2;
    this.pBombActive = true;
    this.pBomb.moveLeft = true;
    this.pBomb.type = 'pBomb';

    // shoot
    this.pBombIntervalId = setInterval(() => {
      console.log('shoot')
      const { x, y, width, height } = this.pBomb.spriteObj, speed = 30;
      new BulletObject("playerBullet", speed, { x, y, width, height });
    }, 300)
  }

  keepInBounds(gameWidth) {
    const { x, width } = this.spriteObj;
    if (x <= 0) this.spriteObj.x = 0;
    if (x + width >= gameWidth) this.spriteObj.x = gameWidth - this.spriteObj.width;
  }
}