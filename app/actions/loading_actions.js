"use strict";

import Reflux from "reflux";

const LoadingActions = Reflux.createActions([
  "loading",
  "loadingComplete"
]);

export default LoadingActions;