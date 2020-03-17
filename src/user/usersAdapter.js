import { BASE_URL, resToJson } from '../utils';
import { User } from './user';

class UsersAdapter {
  static fetchUsers(container) {
    fetch(`${BASE_URL}/users`)
      .then(resToJson)
      .then(json => {
        User.destroyAll();

        json.data.forEach(u => {
          new User({
            id: u.id,
            username: u.attributes.username,
            highestScore: u.attributes.highest_score,
            scores: [...u.attributes.scores]
          })
        });
        User.renderAll(container);
      })
      .catch(error => console.error(error.message));
  }

  static addNewUser(username, value) {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({ username, value })
    }
    fetch(`${BASE_URL}/users`, config)
      .then(resToJson)
      .then(user => {
        // rerender scores & go back to title
      })
      .catch(error => console.log(error.message));
  }
}