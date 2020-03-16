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
    container.innerHTML = `
      <div id="game-over-screen">
        <h1>Game Over!</h1>
        <div id="finals">
          <p id="final-score">Score: <span>${finalScore}</span></p>
          <p id="final-wave">Wave: <span>${finalWave}</span></p>
        </div>

        <div id="game-over-input">
          <label>Enter Your Name</label></br>
          <input type="text">
          <button id="submit-score">Enter</button>
        </div>

        <div id="play-again">
          <button id="play-again-btn">Play Again?</button>
        </div>
      </div>
    `;
  }
}