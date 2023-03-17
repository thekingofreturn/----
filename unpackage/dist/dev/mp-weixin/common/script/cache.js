"use strict";
const common_vendor = require("../vendor.js");
const host = "https://lv.lyxiu.com/";
const controller = "home";
const imgRootDir = "/static/images/";
const userStorageKey = "userinfo";
class Cache {
  constructor(key = "") {
    this.key = userStorageKey;
    if (key)
      this.key = key;
  }
  get data() {
    return common_vendor.index.getStorageSync(this.key) ?? {};
  }
  /**
   * 传对象更新，不传或传字符串清空
   */
  set data(kv = "CLEAR") {
    let _data = {};
    if (typeof kv != "string" && Object.keys(kv).length > 0) {
      _data = { ...this.data, ...kv };
    }
    common_vendor.index.setStorageSync(this.key, _data);
  }
}
function useCache(key) {
  return new Cache(key);
}
exports.controller = controller;
exports.host = host;
exports.imgRootDir = imgRootDir;
exports.useCache = useCache;
exports.userStorageKey = userStorageKey;
