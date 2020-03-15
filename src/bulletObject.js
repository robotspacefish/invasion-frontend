import GameObject from './gameObject';
import AnimatedSpriteObject from './animatedSpriteObject';
import waves2 from './assets/waves2.png';
import sprites from './assets/invasion_sheet.png';
import SpriteObject from './spriteObject';

export default class BulletObject extends GameObject {
  constructor(type, speed, shooter) {
    super();
    this.type = type;
    this.speed = speed;
    this.spriteObj = this.init(shooter)
  }

  init(shooter) {
    let obj = {};
    if (this.type === "playerBullet") {
      obj = {
        sourceX: 0,
        sourceY: 0,
        sourceWidth: 228,
        sourceHeight: 79,
        width: 228 / 2,
        height: 79 / 2,
        frameCount: 7,
        columns: 1,
        rows: 7,
        sheetWidth: 228,
        sheetHeight: 533,
        spritesheet: waves2,
        x: shooter.x + 228 / 2 - shooter.width,
        y: 400
      }
      return new AnimatedSpriteObject(obj)
    } else if (this.type === "enemyBullet") {
      const obj = {
        sourceX: 0,
        sourceY: 352,
        sourceWidth: 23,
        sourceHeight: 32,
        width: Math.floor(23 / 2),
        height: Math.floor(32 / 2),
        spritesheet: sprites,
        x: (shooter.x + (shooter.width / 2)) - Math.floor(23 / 2),
        y: shooter.y + shooter.height
      }
      return new SpriteObject(obj);
    }
  }

  // static speed() {
  //   return 2;
  // }

  update() {
    super.update();
    const direction = this.type === "playerBullet" ? -1 : 1;
    // if (this.type === "playerBullet") {
    //   this.spriteObj.y -= this.speed;
    // } else if (this.type === "enemyBullet") {
    //   this.spriteObj.y += this.speed;
    // }
    this.spriteObj.y += this.speed * direction;

    if (this.type === "playerBullet") {
      this.spriteObj.animate();
      if (this.spriteObj.currentFrame === this.spriteObj.frameCount || this.outOfBounds()) {
        GameObject.remove(this);
      }

    }

    if (this.collided) GameObject.remove(this);


  }

}