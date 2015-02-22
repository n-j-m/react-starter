"use strict";

import React from "react";
import {Route, DefaultRoute} from "react-router";

module.exports = (
  <Route name="app" path="/" handler={require("./components/app")}>
    <DefaultRoute name="home" handler={require("./components/home")} />
    <Route name="signup" handler={require("./components/signup")} />
    <Route name="login" handler={require("./components/login")} />
  </Route>
);
