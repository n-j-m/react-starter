"use strict";

import authStore from "../stores/auth_store";
import Config from "../config";
import LoadingActions from "../actions/loading_actions";

const unsecuredRoutes = Config.getConfig("unsecuredRoutes");

function isSecured(path) {
  return !unsecuredRoutes.filter((route) => path === route).length;
}

const AuthMixin = {

  statics: {
    willTransitionTo(transition) {
      if (isSecured(transition.path)) {
        const user = authStore.getUser();
        if (!user || authStore.getDefaultUser() === user) {
          transition.redirect("/login");
          LoadingActions.loadingComplete();
        }
      }
    }
  }

};

export default AuthMixin;