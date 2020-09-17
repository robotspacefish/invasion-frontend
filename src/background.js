export function buildBackground(ctx) {
  for (let i = 0; i < window.innerWidth; i += 32) {
    for (let j = 0; j < window.innerHeight; j += 32) {
      const randX = Math.floor(Math.random() * window.innerWidth) + 1;
      const randY = Math.floor(Math.random() * window.innerHeight) + 1;
      ctx.fillStyle = 'white';
      ctx.fillRect(randX, randY, 1, 1);
    }
  }
}