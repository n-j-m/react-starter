"use strict";

import React from "react";
import {Link, State} from "react-router";

const NavLink = React.createClass({

  mixins: [ State ],

  render() {
    let isActive = this.isActive(this.props.to, this.props.params, this.props.query);
    let className = isActive ? "active" : "";
    let link = (
      <Link {...this.props} />
    );

    return <li className={className}>{link}</li>;
  }

});

export default NavLink;