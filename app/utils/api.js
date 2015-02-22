const endpoint = "/api/v1";

import LoadingActions from "../actions/loading_actions";

const _users = [
  {username: "test", password: "test"}
];

const api = {

  login(username, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(_users[0]);
      }, 0);
    });
  },

  signup(username, password, profileData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(_users[0]);
      }, 0);
    });
  }

};

module.exports = api;