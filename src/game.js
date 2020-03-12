import Player from './player';
import { spritesheet } from './assets/invasion_sheet.png';
export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.player = new Player();
  }


  update() {
    this.player.update();
  }

  draw(ctx) {
    this.player.draw(ctx);
  }
}