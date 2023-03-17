"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_script_tip = require("./common/script/tip.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/pay/index.js";
  "./pages/my/index.js";
}
const _sfc_main = {
  __name: "App",
  setup(__props) {
    common_vendor.onUnhandledRejection((res) => {
      var _a;
      if ((_a = res == null ? void 0 : res.reason) == null ? void 0 : _a.msg)
        common_script_tip._tip(res.reason.msg);
    });
    return () => {
    };
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/前端项目/朝暮订阅/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
