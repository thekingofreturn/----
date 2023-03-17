"use strict";
const common_vendor = require("../vendor.js");
function _tip(title, icon = "none", duration = 1500) {
  typeof icon == "number" && ([duration, icon] = [icon, "none"]);
  return new Promise((resolve) => {
    common_vendor.index.showToast({ title, duration, icon, mask: true });
    setTimeout(() => {
      resolve();
    }, duration);
  });
}
function _go(url, type = 0) {
  if (typeof url == "number") {
    common_vendor.index.navigateBack({ delta: url });
  } else {
    switch (type) {
      case 0:
        common_vendor.index.navigateTo({ url });
        break;
      case 1:
        common_vendor.index.redirectTo({ url });
        break;
      case 2:
        common_vendor.index.reLaunch({ url });
        break;
      case 3:
        common_vendor.index.switchTab({ url });
        break;
    }
  }
}
exports._go = _go;
exports._tip = _tip;
