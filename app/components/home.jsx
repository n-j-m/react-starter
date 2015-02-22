"use strict";

import React from "react";
import TransitionMixin from "../utils/transition_mixin";
import AuthMixin from "../utils/auth_mixin";

const Home = React.createClass({
  mixins: [TransitionMixin, AuthMixin],

  render() {
    return (
      <h1>Home</h1>
    );
  }
});

export default Home;
