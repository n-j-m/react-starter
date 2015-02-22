"use strict";

require("babel/register");

import React from "react";
import Router from "react-router";

import routes from "./routes";

const content = document.getElementById("content");
console.log("main");
Router.run(routes, Router.HistoryLocation, (Handler) => {
  console.log("handle");
  return React.render(<Handler/>, content);
});
