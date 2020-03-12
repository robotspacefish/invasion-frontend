
export default class SpriteObject {
  constructor(sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, imageSrc) {
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.sourceWidth = sourceWidth;
    this.sourceHeight = sourceHeight;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
  }
}