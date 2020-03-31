import GameObject from './gameObject';
import AnimatedSpriteObject from './animatedSpriteObject';
import explosion from './assets/explosionsheet.png';
import { getRandomExplosionSound } from './utils';

export default class ExplosionObject extends GameObject {
  constructor(explodedObject) {
    super();
    this.type = "explosion";
    this.spriteObj = this.init(explodedObject);
  }

  static createExplosion(obj) {
    new ExplosionObject(obj);
    const sound = new Audio(getRandomExplosionSound());
    sound.play();
  }

  init(explodedObject) {
    const { x, y, height, width } = explodedObject.spriteObj;
    return new AnimatedSpriteObject({
      sourceX: 0,
      sourceY: 0,
      sourceWidth: 640, // actual size
      sourceHeight: 640,
      width: 320, // how big I want it to be
      height: 320,
      sheetWidth: 2560,
      sheetHeight: 2560,
      spritesheet: explosion,
      frameCount: 12,
      columns: 4,
      rows: 4,
      x: x - width,
      y: y - height
    });
  }

  update() {
    this.spriteObj.animate();

    if (this.spriteObj.currentFrame === this.spriteObj.frameCount) {
      GameObject.remove(this);
    }
  }
}