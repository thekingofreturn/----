"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  spin();
}
const spin = () => "./theme/spin/index.js";
const _sfc_main = {
  __name: "aloading",
  props: {
    text: { type: String, default: "" },
    theme: { type: String, default: "spin" },
    // 暂时就一种
    show: { type: Boolean, default: true },
    mode: { type: String, default: "more" },
    // 支持 more:加载更多，empty:没有更多数据，两种文字模式，当text有值时无效
    emptyText: { type: String, default: "—— 没有更多了 ——" },
    moreText: { type: String, default: "数据加载中..." }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show
      }, __props.show ? common_vendor.e({
        b: __props.mode == "more"
      }, __props.mode == "more" ? common_vendor.e({
        c: __props.theme == "spin"
      }, __props.theme == "spin" ? {} : {}) : {}, {
        d: common_vendor.t(__props.text ? __props.text : __props.mode == "more" ? __props.moreText : __props.emptyText)
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-21f8f990"], ["__file", "F:/前端项目/朝暮订阅/components/aloading/aloading.vue"]]);
wx.createComponent(Component);
