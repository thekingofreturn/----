"use strict";
require("../vendor.js");
const globalData = (k, v) => {
  const app = getApp();
  if (v !== void 0) {
    app.globalData[k] = v;
  } else {
    switch (k.constructor) {
      case String:
        return app.globalData[k];
      case Array:
        return Object.fromEntries(k.map((_k) => [_k, app.globalData[_k]]));
      case Object:
        Object.assign(app.globalData, k);
        break;
    }
  }
};
exports.globalData = globalData;
