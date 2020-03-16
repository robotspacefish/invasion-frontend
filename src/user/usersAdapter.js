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
}

export { UsersAdapter };