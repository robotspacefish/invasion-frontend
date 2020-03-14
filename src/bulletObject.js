import GameObject from './gameObject';
import AnimatedSpriteObject from './animatedSpriteObject';
import waves from './assets/waves.png';

export default class BulletObject extends GameObject {
  constructor(type, shooter) {
    super();
    this.type = type;
    this.spriteObj = this.init(shooter)
    // BulletObject.all.push(this);
  }

  init(shooter) {
    let obj = {};
    if (this.type === "playerBullet") {
      obj = {
        sourceX: 0,
        sourceY: 0,
        sourceWidth: 224,
        sourceHeight: 344,
        width: 224 / 2,
        height: 344 / 2,
        frameCount: 12,
        columns: 4,
        rows: 3,
        sheetWidth: 1032,
        sheetHeight: 896,
        spritesheet: waves,
        x: shooter.x + 224 / 2 - shooter.width,
        y: 450 - 344 / 2
      }
    }
    // else if (type === "enemy") {

    // }
    return new AnimatedSpriteObject(obj)
  }

  static speed() {
    return 2;
  }

  update() {
    if (this.type === "playerBullets") {
      this.x -= BulletObject.speed;
    }
    this.spriteObj.animate();

    if (this.spriteObj.currentFrame === this.spriteObj.frameCount) {
      GameObject.remove(this);
    }
  }

}