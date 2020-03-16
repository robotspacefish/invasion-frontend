class User {
  static all = [];

  constructor({ id, username, highestScore, scores }) {
    this.id = id;
    this.highestScore = highestScore;
    this.username = username;
    this.scores = [...scores];

    User.all.push(this);
  }

  static destroyAll() {
    User.all = [];
  }

  static renderAll(container) {
    container.innerHTML = '';
    const usersDiv = document.createElement('div');
    usersDiv.classList.add('users');
    container.innerHTML = "<h3>User's Highest Scores</h3>";
    container.appendChild(usersDiv);
    User.all.forEach(u => {
      usersDiv.innerHTML += `
        <div class="user">
          <p>${u.username} - ${u.highestScore}</p>
        </div>
      `;
    })
  }
}

export { User };