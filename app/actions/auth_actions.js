"use strict";

import Reflux from "reflux";
import api from "../utils/api";

const AuthActions = Reflux.createActions({
  "login": {asyncResult: true},
  "logout": {asyncResult: false}
});

AuthActions.login.listenAndPromise(api.login);

export default AuthActions;