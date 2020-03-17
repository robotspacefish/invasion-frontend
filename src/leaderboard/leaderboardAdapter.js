import { BASE_URL, resToJson } from '../utils';
import Leaderboard from './leaderboard';

export default class LeaderboardAdapter {
  static fetchLeaderboard(container) {
    fetch(`${BASE_URL}/leaderboard`)
      .then(resToJson)
      .then(json => {
        const highestScoringUsers = json.map(s => {
          return {
            id: s.id,
            value: s.value,
            username: s.username
          };
        });
        const leaderboard = new Leaderboard(highestScoringUsers);
        leaderboard.render(container);
      })
      .catch(error => console.error(error.message));
  }
}