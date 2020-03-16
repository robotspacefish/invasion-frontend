class Leaderboard {
  constructor(highestScoringUsers) {
    this.highestScoringUsers = [...highestScoringUsers];
  }

  render(container) {
    const leaderboardDiv = document.createElement('div');
    leaderboardDiv.classList.add('leaderboard');
    container.innerHTML = '<h3>High Scores</h3>';
    container.appendChild(leaderboardDiv);

    this.highestScoringUsers.forEach((hsu, i) => {
      leaderboardDiv.innerHTML += `
          <p id="user-score">${i + 1}. ${hsu.username} - ${hsu.value}</p>
      `;
    });
  }
}

export { Leaderboard };