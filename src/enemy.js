import GameObject from './gameObject';
import SpriteObject from "./spriteObject";
import { GAME_WIDTH, GAME_HEIGHT } from './index';
import { generateRandomNumber } from './utils';

import Game from "./game";

export default class Enemy extends GameObject {
  constructor(speed = 0.45) {
    super();
    this.spriteObj = new SpriteObject(3, 176, 218, 169, generateRandomNumber(0, GAME_WIDTH - 169), -200, 218 / 2, 169 / 2);
    this.speed = speed;
  }

  static get frequency() {
    return 0.003;
  }

  update() {
    this.spriteObj.y += this.speed;

    if (this.spriteObj.y > GAME_HEIGHT + 10) GameObject.remove(this);
  }

  static shouldSpawn() {
    return Math.random() < Enemy.frequency
  }

  static spawn() {
    new Enemy(generateRandomNumber(0.5, 1.2))
  }

}

setInterval(() => {
  Enemy.spawn();
}, 1000)