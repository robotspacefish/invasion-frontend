import GameObject from './gameObject';
import AnimatedSpriteObject from './animatedSpriteObject';
import explosion from './assets/explosionsheet.png';

export default class ExplosionObject extends GameObject {
  constructor(explodedObject) {
    console.log('creating explosion...')
    super();
    this.type = "explosion";
    this.spriteObj = this.init(explodedObject);
    console.log(`
      explosion:
        x: ${this.spriteObj.x},
        y: ${this.spriteObj.y},
        w: ${this.spriteObj.width},
        h: ${this.spriteObj.height}
      ----------------------------
      enemy:
        x: ${explodedObject.spriteObj.x},
        y: ${explodedObject.spriteObj.y},
        w: ${this.spriteObj.width},
        h: ${explodedObject.spriteObj.height}
    `)
  }

  init(explodedObject) {
    const { x, y, height, width } = explodedObject.spriteObj;
    debugger
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
    super.update();
    this.spriteObj.animate();

    if (this.spriteObj.currentFrame === this.spriteObj.frameCount) {
      GameObject.remove(this);
    }
  }
}