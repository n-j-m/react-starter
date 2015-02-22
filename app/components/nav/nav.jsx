"use strict";

import React from "react";
import {Link} from "react-router";

import AuthLink from "./authlink";
import NavLink from "./navlink";

const Nav = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    isLoading: React.PropTypes.bool.isRequired
  },

  render() {

    var spinner = (
      this.props.isLoading ? <i className="fa fa-spinner fa-pulse"></i> : "Brand"
    );

    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to="home" className="navbar-brand">{spinner}</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <NavLink to="home">Home</NavLink>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <AuthLink user={this.props.user} />
            </ul>
          </div>
        </div>
      </nav>
    );

  }

});

export default Nav;
