"use strict";

const _config = {
  unsecuredRoutes: ["/login"]
}

const Config = {
  getConfig(key) {
    return _config[key];
  }
}

export default Config;