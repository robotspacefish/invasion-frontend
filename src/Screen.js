export default class Screen {
  static renderTitle(container) {
    container.innerHTML = `
      <div id="title-screen">
        <h1 id="title">Invasion!</h1>
        <p>Press [SPACEBAR] to Start<p>
      </div>
    `
  }

  static renderGameOver(container, finalScore, finalWave) {
    console.log(finalScore, finalWave)
  }
}