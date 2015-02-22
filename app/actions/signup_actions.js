"use strict";

import Reflux from "reflux";
import api from "../utils/api";

const SignupActions = Reflux.createActions({
  "signup": { asyncResult: true }
});

SignupActions.signup.listenAndPromise(api.signup);

export default SignupActions;