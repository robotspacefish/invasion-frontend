import { GAME_HEIGHT } from "./index";

export default class GameObject {
  static all = [];

  constructor() {
    GameObject.all.push(this);
    this.collided = false;
  }

  static remove(objToDelete) {
    GameObject.all = GameObject.all.filter(gameObj => {
      return JSON.stringify(gameObj) !== JSON.stringify(objToDelete);
    });
  }

  static get enemyCount() {
    return GameObject.all.filter(o => o.type === "enemy").length;
  }

  outOfBounds() {
    const { y, height } = this.spriteObj;
    return y < 0 || y + height > GAME_HEIGHT;
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
      (pType === "playerBullet" && oType === "enemy");
  }

  handleCollision(obj) {
    this.collided = true;
    obj.collided = true;

    const player = this.getPlayerObj();
    if (this.type === "playerBullet") {
      player.addPoint();
    }

    if (this.type === "enemyBullet") {
      player.isHit = true;
    }
  }

  getPlayerObj() {
    return GameObject.all.find(o => o.type === "player");
  }

  checkForCollision() {
    let otherObjects = [];
    if (this.type === "playerBullet") {
      otherObjects = GameObject.all.filter(o => o.type === "enemy");
    } else if (this.type === "player") {
      otherObjects = GameObject.all.filter(o => o.type === "enemy" || o.type === "enemyBullet");
    }

    otherObjects.forEach(o => {
      if (this.hasCollided(o)) this.handleCollision(o);
    })
  }

  update() {
    this.checkForCollision();
  }

  draw(ctx) {
    const { sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height, image } = this.spriteObj;
    ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height);
  }
}