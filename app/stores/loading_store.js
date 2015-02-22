"use strict";

import Reflux from "reflux";
import LoadingActions from "../actions/loading_actions";

const LoadingStore = Reflux.createStore({

  listenables: LoadingActions,

  onLoading() {
    this.trigger(true);
  },

  onLoadingComplete() {
    this.trigger(false);
  }

});

export default LoadingStore;