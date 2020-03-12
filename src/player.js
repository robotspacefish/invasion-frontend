import SpriteObject from './spriteObject';
import Spritesheet from './assets/invasion_sheet.png';
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { mid } from './utils';

export default class Player {
  constructor() {
    this.spriteObj = this.initSprite();
  }

  initSprite() {
    return new SpriteObject(3, 0, 218, 164, 0, 0, 218 / 2, 164 / 2, Spritesheet);
  }

  draw(ctx) {
    const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, image } = this.spriteObj;
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);

  }

  update() {

  }
}