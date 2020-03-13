import GameObject from './gameObject';
import SpriteObject from './spriteObject';
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import GameObject from './gameObject';

class BulletObject extends GameObject {
  constructor(type, playerObj) {
    super();
    this.spriteObj = this.init(type)
    BulletObject.all.push(this);
  }

  init() {
    new SpriteObject(448, 0, 32, 304, playerObj.width / 2, playerObj)
  }

  update() {

  }

}