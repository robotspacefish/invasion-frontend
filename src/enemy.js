import GameObject from './gameObject';
import SpriteObject from "./spriteObject";
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { generateRandomNumber } from './utils';
import Game from "./game";

export default class Enemy extends GameObject {
  constructor(speed = 0) {
    super();
    this.spriteObj = new SpriteObject(3, 176, 218, 169, generateRandomNumber(0, GAME_WIDTH - 169), -200, 218 / 2, 169 / 2);
    this.speed = speed;
    // Enemy.all.push(this);
  }

  static get frequency() {
    return 0.95;
  }

  update(gravity) {
    this.spriteObj.y += gravity * this.speed;

    // if (this.spriteObj.y > GAME_HEIGHT) Enemy.remove();
  }

  static shouldSpawn() {
    return Math.random() > Enemy.frequency
  }

  static spawn() {
    new Enemy(generateRandomNumber(0.5, 1.2))
  }

}