import Player from './player';
import { spritesheet } from './assets/invasion_sheet.png';
export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
  }

  static get gravity() {
    return 0.75;
  }

  update() {
    this.player.update();
  }

  draw(ctx) {
    this.player.draw(ctx);
  }
}