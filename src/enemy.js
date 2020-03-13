import GameObject from './gameObject';
import SpriteObject from "./spriteObject";
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import Game from "./game";

export default class Enemy extends GameObject {
  constructor() {
    super();
    this.spriteObj = new SpriteObject(3, 176, 218, 169, (GAME_WIDTH / 2) - (218 / 2 / 2), -200, 218 / 2, 169 / 2);
    Enemy.all.push(this);
  }

  static all = [];

  update(gravity) {
    this.spriteObj.y += gravity;
  }

}