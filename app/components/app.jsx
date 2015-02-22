"use strict";

import React from "react";
import {RouteHandler, Link} from "react-router";
import Nav from "./nav/nav";
import Reflux from "reflux";

import authStore from "../stores/auth_store";
import loadingStore from "../stores/loading_store";
import {Navigation} from "react-router";

import TransitionMixin from "../utils/transition_mixin";

const DEFAULT_USER = authStore.getDefaultUser();

const App = React.createClass({
  mixins: [Reflux.ListenerMixin, Navigation],

  getInitialState() {
    return {
      user: authStore.getUser(),
      isLoading: false
    };
  },

  componentDidMount() {
    this.listenTo(authStore, this.onAuth);
    this.listenTo(loadingStore, this.onLoading);
  },

  onLoading(isLoading) {
    this.setState({isLoading});
  },

  onAuth(userResponse) {
    // TODO - Handle errors
    var user = userResponse.user;
    this.setState({user});
    if (user === DEFAULT_USER) {
      this.transitionTo("/login");
    } else {
      this.transitionTo("/");
    }
  },

  render() {
    return (
      <div>
        <Nav user={this.state.user} isLoading={this.state.isLoading} />
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 col-xs-12">
              <RouteHandler />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default App;
