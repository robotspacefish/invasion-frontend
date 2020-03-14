export default class GameObject {
  static all = [];

  constructor() {
    GameObject.all.push(this);
  }

  static remove(objToDelete) {
    GameObject.all = GameObject.all.filter(gameObj => {
      return JSON.stringify(gameObj) !== JSON.stringify(objToDelete);
    });
  }

  hasCollided(obj) {
    const { x, y, width, height } = this.spriteObj;
    return x + width > obj.spriteObj.x &&
      x < obj.spriteObj.x + obj.spriteObj.width &&
      y + height > obj.spriteObj.y &&
      y < obj.spriteObj.y + obj.spriteObj.height;
  }

  canCollide(obj) {
    const pType = this.type, oType = obj.type;

    return (pType === "player" && oType === "enemy") ||
      (pType === "enemy" && oType === "player") ||
      (pType === "player" && oType === "enemyBullet") ||
      (pType === "playerBullet" && oType === "enemy")
  }

  draw(ctx) {
    const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, image } = this.spriteObj;
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  }
}