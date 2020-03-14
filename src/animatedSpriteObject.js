import SpriteObject from './spriteObject';

export default class AnimatedSpriteObject extends SpriteObject {
  constructor({ sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, frameCount, sheetWidth, sheetHeight, columns, rows, spritesheet }) {
    super({ sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, spritesheet })
    this.frameCount = frameCount;
    this.sheetWidth = sheetWidth;
    this.sheetHeight = sheetHeight;
    this.columns = columns;
    this.rows = rows;
    this.currentFrame = 1;
    this.delay = 3;
    this.count = 0;
  }

  animate() {
    this.count++

    if (this.count >= this.delay) {

      this.sourceX = Math.floor(this.currentFrame % this.columns) * this.sourceWidth;
      this.sourceY = Math.floor(this.currentFrame / this.columns) * this.sourceHeight;

      if (this.currentFrame == this.frameCount) this.currentFrame = 0;
      else if (this.currentFrame < this.frameCount) this.currentFrame++;
      this.count = 0;
    }
  }
}