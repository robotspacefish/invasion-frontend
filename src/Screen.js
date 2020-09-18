import { reset, handleFormSubmit } from './index';

const container = document.getElementById('text-screen');

export default class Screen {
  static renderTitle() {

    container.innerHTML = `
        <h1 id="title">Invasion!</h1>
        <p>Press [SPACEBAR] to Start<p>
        ${Screen.renderControlInstructions()}
    `;
  }

  static hideCanvas(canvas) {
    container.style.display = 'initial';
    canvas.style.display = 'none';
  }

  static showCanvas(canvas) {
    container.style.display = 'none';
    canvas.style.display = 'initial';
  }

  static renderControlInstructions() {
    return `
      <div class="controls">
        <h3>Controls</h3>
        <ul>
          <li>Shoot - Spacebar</li>
          <li>Move - Left/Right Arrows</li>
        <ul>
      </div>
    `
  }

  static renderGameOver(finalScore, finalWave) {
    container.innerHTML = `
      <div id="game-over-screen">
        <h1>Game Over!</h1>
        <div id="finals">
          <p id="final-score">Score: <span>${finalScore}</span></p>
          <p id="final-wave">Wave: <span>${finalWave}</span></p>
        </div>

        <div id="game-over-input">
          <form>
            <label>Enter Your Name</label></br>
           <div>
              <input type="text">
              <button id="submit-score-btn" class="btn">Enter</button>
           </div>
          </form
        </div>
        <button id="play-again-btn" class="btn">Play Again?</button>
      </div>
    `;

    document.getElementById('submit-score-btn').addEventListener('click', (e) => handleFormSubmit(e, finalScore));
    document.getElementById('play-again-btn').addEventListener('click', reset)
  }
}
