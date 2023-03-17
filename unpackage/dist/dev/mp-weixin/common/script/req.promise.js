"use strict";
const common_vendor = require("../vendor.js");
const common_script_cache = require("./cache.js");
const login = "Login/handleLogin";
const upload = "Upload/addimage";
const userId = "user/getUserInfo";
const baseConfig = "index/getConfig";
const bindShare = "user/bindingShareUser";
const goodsCate = "index/getBrand";
const goodsList = "index/goodsList";
const payRegion = "index/getAreaList";
const payType = "index/getSpecList";
const payCommit = "index/payConclude";
const orderList = "index/getOrderList";
const subscribeCommit = "index/concludeGood";
const subscribeCancel = "index/cancelConcludeGood";
const url = (uri) => {
  let http = common_script_cache.host;
  http += `/${common_script_cache.controller}`;
  if (uri.indexOf("://") == -1)
    uri = `${http}/${uri}`.replace(/([^:])\/{2}/g, "$1/");
  return uri;
};
const request = (uri = "", args = {}, method = "GET", unParse = false) => {
  let userinfo = common_vendor.index.getStorageSync(common_script_cache.userStorageKey);
  let token = (userinfo == null ? void 0 : userinfo.token) || "";
  let header = { "content-type": "application/json;charset=utf-8", token };
  let config = { url: url(uri), data: args, method, header };
  return new Promise((resolve, reject) => {
    config.success = (res) => {
      if (unParse) {
        return resolve(res.data);
      }
      let { code, data, msg } = res.data;
      switch (code / 1) {
        case 0:
          resolve(data);
          break;
        case 1:
          reject(res.data);
          break;
        case 2:
          tologin(uri, args, method).then(resolve).catch(reject);
          break;
        default:
          reject(res.data);
      }
    };
    config.fail = (res) => {
      reject(res);
    };
    config.complete = () => {
    };
    common_vendor.index.request(config);
  });
};
const tologin = (uri, data, method) => {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      provider: "weixin",
      success(res) {
        let { code } = res;
        request(login, { code }, "POST").then((res2) => {
          try {
            common_vendor.index.setStorageSync(common_script_cache.userStorageKey, res2.userinfo || res2);
            if (uri) {
              request(uri, data, method).then((res3) => {
                resolve(res3);
              }).catch((res3) => {
                reject(res3);
              });
            } else {
              resolve(res2);
            }
          } catch (err) {
            reject(err);
          }
        });
      }
    });
  });
};
const toUpload = (filePath, name = "file", uri = "upload") => {
  return new Promise(async (resolve, reject) => {
    let uploader = await common_vendor.index.uploadFile({
      url: url(uri),
      filePath,
      name
    });
    let json = JSON.parse(uploader.data);
    if (!json.code) {
      resolve(json.data);
    } else {
      reject(json);
    }
  });
};
const __get = (uri, data) => request(uri, data);
const __post = (uri, data) => request(uri, data, "POST");
const __postImage = (filePath, name) => toUpload(filePath, name, upload);
exports.__get = __get;
exports.__post = __post;
exports.__postImage = __postImage;
exports.baseConfig = baseConfig;
exports.bindShare = bindShare;
exports.goodsCate = goodsCate;
exports.goodsList = goodsList;
exports.orderList = orderList;
exports.payCommit = payCommit;
exports.payRegion = payRegion;
exports.payType = payType;
exports.subscribeCancel = subscribeCancel;
exports.subscribeCommit = subscribeCommit;
exports.userId = userId;
