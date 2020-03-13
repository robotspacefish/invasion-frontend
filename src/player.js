import SpriteObject from './spriteObject';
import Spritesheet from './assets/invasion_sheet.png';
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { mid } from './utils';

export default class Player {
  constructor() {
    this.spriteObj = this.initSprite();
    this.dx = 0;
    this.dxMax = 25; // speed limit
    this.acceleration = 2; // how much is added to movement
    this.moveLeft = false;
    this.moveRight = false;
    this.shoot = false;
  }

  static get friction() {
    return 0.98; // slow player movement
  }

  initSprite() {
    return new SpriteObject(3, 0, 218, 164, (GAME_WIDTH / 2) - (218 / 2 / 2), GAME_HEIGHT - 150, 218 / 2, 164 / 2);
  }

  draw(ctx) {
    const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, image } = this.spriteObj;
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);

  }

  update() {
    this.dx *= Player.friction;

    if (this.moveLeft && !this.moveRight) {
      this.moveLeftAction();
      this.moveLeft = false;
    }

    if (this.moveRight && !this.moveLeft) {
      this.moveRightAction();
      this.moveRight = false;
    }
    if (this.shoot) {
      this.shootAction();
      this.shoot = false;
    }

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

  keepInBounds() {
    const { x, y, width } = this.spriteObj;
    if (x <= 0) this.spriteObj.x = 0;
    if (x + width >= GAME_WIDTH) this.spriteObj.x = GAME_WIDTH - this.spriteObj.width;
  }
}