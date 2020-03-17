import { BASE_URL, resToJson } from '../utils';
import Score from './score';

export default class ScoresAdapter {
  static fetchScores(container) {
    fetch(`${BASE_URL}/scores`)
      .then(resToJson)
      .then(json => {
        Score.destroyAll();

        json.data.forEach(s => {
          new Score({
            id: s.id,
            value: s.attributes.value,
            createdAt: s.attributes.created_at,
            userId: s.relationships.user.data.id
          })
        });

        Score.renderAll(container);
      })
      .catch(error => console.error(error.message));
  }

  static addNewScore(value, user_id) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ value, user_id })
    }
    fetch(`${BASE_URL}/scores`, config)
      .then(resToJson)
      .then(score => {
        // debugger
        // render users
      })
      .catch(error => console.log(error.message));
  }
}