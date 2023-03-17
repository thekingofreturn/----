"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(10, (n, k0, i0) => {
          return {
            a: n
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cab65c51"], ["__file", "F:/前端项目/朝暮订阅/components/aloading/theme/spin/index.vue"]]);
wx.createComponent(Component);
