import GameObject from './gameObject';
import AnimatedSpriteObject from './animatedSpriteObject';
import waves2 from './assets/waves2.png';
import sprites from './assets/invasion_sheet.png';
import SpriteObject from './spriteObject';
import ExplosionObject from './explosionObject';

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
        sourceWidth: 32,
        sourceHeight: 32,
        width: 23,
        height: 32,
        spritesheet: sprites,
        x: (shooter.x + (shooter.width / 2)) - 16,
        y: shooter.y + shooter.height
      }
      return new SpriteObject(obj);
    }
  }

  update() {
    super.update();
    const direction = this.type === "playerBullet" ? -1 : 1;

    this.spriteObj.y += this.speed * direction;

    if (this.type === "playerBullet") {
      this.spriteObj.animate();
      if (this.spriteObj.currentFrame === this.spriteObj.frameCount) {
        GameObject.remove(this);
      }
    }

    if (this.collided || this.outOfBounds()) GameObject.remove(this);
  }

}
