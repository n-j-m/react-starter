"use strict";

import Reflux from "reflux";
import AuthActions from "../actions/auth_actions";

const DEFAULT_USER = {username: "__DEFAULT__"};

const AuthStore = Reflux.createStore({

  init() {
    this.user = this.getDefaultUser();
  },

  listenables: AuthActions,

  onLoginCompleted(user) {
    this.user = user;
    this.trigger({user});
  },

  onLoginFailed(error) {
    this.trigger({error});
  },

  onLogout() {
    this.user = this.getDefaultUser();
    this.trigger({user: this.user});
  },

  getUser() {
    return this.user;
  },

  getDefaultUser() {
    return DEFAULT_USER;
  }

});

module.exports = AuthStore;