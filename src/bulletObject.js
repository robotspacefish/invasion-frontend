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
    if (this.type === "player") {
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
        x: shooter.x + (shooter.width / 2),
        y: shooter.y
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
    if (this.type === "player") {
      this.x -= BulletObject.speed;
    }
    this.spriteObj.animate();

    if (this.spriteObj.currentFrame === this.spriteObj.frameCount) {
      GameObject.remove(this);
    }
  }

}