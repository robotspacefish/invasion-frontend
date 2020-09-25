import { reset, handleFormSubmit } from './index';

const container = document.getElementById('text-screen');

export default class Screen {
  static renderTitle() {

    container.innerHTML = `
        <h1 id="title">Invasion!</h1>
        <p>Press [SPACEBAR] to Start<p>
        <p>(This game is meant to be played on a desktop)</p>
        ${Screen.renderControlInstructions()}
        <div class="credits">
          <p>Assets Used:</p>
          <ul>
            <li>2D Spaceships Collection by <a href="https://gameassets.itch.io/2d-spaceships-collection-gameassets"
                target="_blank" rel="noopener noreferrer">gameassets</a></li>
            <li>Boom Pack by <a href="https://opengameart.org/content/boom-pack-1" target="_blank"
                rel="noopener noreferrer">dklon</a></li>
            <li>Waves and Explosion2 by <a href="https://opengameart.org/content/sci-fi-effects" target="_blank"
                rel="noopener noreferrer">Skorpio</a></li>
            <li>Dog Bark 3 by <a href="https://freesound.org/people/jorickhoofd/sounds/160094/" target="_blank"
                rel="noopener noreferrer">jorickhoofd</a></li>
          </ul>
          <br>
          <p class="copyright">
            <a href="https://github.com/robotspacefish" target="_blank" rel="noopener noreferrer">©2020 robotspacefish!</a>
          </p>
        </div>
    `;
  }

  static hideCanvas(canvas) {
    container.style.display = 'flex';
    canvas.style.display = 'none';
  }

  static showCanvas(canvas) {
    container.style.display = 'none';
    canvas.style.display = 'block';
  }

  static renderControlInstructions() {
    return `
      <div class="controls">
        <h3>Controls</h3>
        <ul>
          <li>Shoot - Spacebar</li>
          <li>Move - A/D or Q/D or Left/Right Arrows</li>
          <li>Deploy P-Bomb - W or Z or Up Arrow</li>
        <ul>
      </div>
    `
  }

  static renderGameOver(finalScore, finalWave, highestScores) {
    const scores = highestScores.map((score, i) => {
      return `<tr><td>${i + 1}</td><td>${score.username}</td><td>${score.value}</td></tr>`;
    }).join("");

    const isFormVisible = finalScore > highestScores[highestScores.length - 1].value;

    const content = `
        <h1>Game Over!</h1>
        <div id="finals">
          <p id="final-score">Score: <span>${finalScore}</span></p>
          <p id="final-wave">Wave: <span>${finalWave}</span></p>
        </div>

        <table id="high-scores">
          <thead>
            <tr>
              <td>RANK</td>
              <td>NAME</td>
              <td>SCORE</td>
            </tr>
          </thead>
          <tbody>
            ${scores}
          </tbody>
        </table>

        <div id="game-over-input">
          ${isFormVisible ? addScoreForm() : ''}
          <button id="play-again-btn" class="btn">Play Again?</button>
        </div>
    `;

    container.innerHTML = content;

    // event listeners
    isFormVisible ? document.getElementById('submit-score-btn').addEventListener('click', (e) => handleFormSubmit(e, finalScore)) : null;

    document.getElementById('play-again-btn').addEventListener('click', reset)
  }
}

function addScoreForm() {
  return `
    <form>
      <label>Enter Your Name</label></br>
      <div>
        <input type="text">
        <button id="submit-score-btn" class="btn">Enter</button>
      </div>
    </form
  </div>
  `;
}