import { BASE_URL, resToJson } from '../utils';
import Leaderboard from './leaderboard';

export default class LeaderboardAdapter {
  static fetchLeaderboard() {
    return fetch(`${BASE_URL}/leaderboard`)
      .then(resToJson)
      .then(json => {
        const highestScoringUsers = json.map(s => {
          return {
            value: s.value,
            username: s.username
          };
        });

        const leaderboard = new Leaderboard(highestScoringUsers);
        // leaderboard.render(container);
        return leaderboard;
      })
      .catch(error => console.error(error.message));
  }
}