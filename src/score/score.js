export default class Score {
  static all = [];

  constructor({ id, value, createdAt, userId }) {
    this.id = id;
    this.value = value;
    this.createdAt = createdAt
    this.userId = userId;
    Score.all.push(this);
  }

  static destroyAll() {
    Score.all = [];
  }

  static renderAll(container) {
    container.innerHTML = '';
    const scoresDiv = document.createElement('div');
    scoresDiv.classList.add('scores');
    container.appendChild(scoresDiv);

    Score.all.forEach(s => {
      scoresDiv.innerHTML += `
        <div class="score">
          <h3>${s.value}</h3>
        </div>
      `;
    });
  }

}