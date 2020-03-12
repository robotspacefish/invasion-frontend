import SpriteObject from './spriteObject';
import Spritesheet from './assets/invasion_sheet.png';
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { mid } from './utils';

export default class Player {
  constructor() {
    this.spriteObj = this.initSprite();
    this.dx = 0;
    this.dxMax = 35; // speed limit
    this.acceleration = 2; // how much is added to movement
    this.moveLeft = false;
    this.moveRight = false;
    this.shoot = false;
  }

  static get friction() {
    return 0.95; // slow player movement
  }

  initSprite() {
    return new SpriteObject(3, 0, 218, 164, (GAME_WIDTH / 2) - (218 / 2 / 2), GAME_HEIGHT - 150, 218 / 2, 164 / 2, Spritesheet);
  }

  draw(ctx) {
    const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, image } = this.spriteObj;
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);

  }

  update() {

  }
}