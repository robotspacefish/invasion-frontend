export default class GameObject {
  static all = [];
  constructor() {
    GameObject.all.push(this);
  }

  static remove(obj) {
    GameObject.all = GameObject.all.filter(gameObj => {
      return gameObj.spriteObj.x !== obj.spriteObj.x &&
        gameObj.spriteObj.y !== obj.spriteObj.y;
    });

  }

  draw(ctx) {
    const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, image } = this.spriteObj;
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  }
}