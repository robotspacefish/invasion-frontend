import GameObject from './gameObject';
import AnimatedSpriteObject from './animatedSpriteObject';
import waves from './assets/waves.png';
import waves2 from './assets/waves2.png';

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
        x: shooter.x + 224 / 2 - shooter.width,
        // y: 450 - 344 / 2
        y: 400
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
    super.update();
    if (this.type === "playerBullet") {
      this.spriteObj.y -= this.speed
    }
    this.spriteObj.animate();

    if (this.collided) GameObject.remove(this);

    if (this.spriteObj.currentFrame === this.spriteObj.frameCount || this.outOfBounds()) {
      GameObject.remove(this);
    }
  }

}