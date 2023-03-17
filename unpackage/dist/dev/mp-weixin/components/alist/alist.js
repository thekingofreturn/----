"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_aempty2 = common_vendor.resolveComponent("aempty");
  const _easycom_aloading2 = common_vendor.resolveComponent("aloading");
  (_easycom_aempty2 + _easycom_aloading2)();
}
const _easycom_aempty = () => "../aempty/aempty.js";
const _easycom_aloading = () => "../aloading/aloading.js";
if (!Math) {
  (_easycom_aempty + _easycom_aloading)();
}
const _sfc_main = {
  __name: "alist",
  props: {
    // 加载中
    loading: { type: Boolean, default: true },
    loadMore: { type: String, default: "数据加载中..." },
    noMore: { type: String, default: "—— 没有更多了 ——" },
    // 无数据
    emptyText: { type: String, default: "暂无相关商品~" },
    emtpyIcon: String,
    emtpyIconSize: { type: Number, default: 100 },
    // 数据
    dataList: { type: Array, default: [] },
    forKey: String
    // v-for :key="forKey"
  },
  emits: ["update:loading", "update:dataList"],
  setup(__props, { expose, emit: emits }) {
    const props = __props;
    const data = common_vendor.reactive({
      loadMode: "more"
    });
    const methods = {
      loadMore(promise) {
        emits("update:loading", true);
        promise().then((res) => {
          if (res.length) {
            emits("update:dataList", props.dataList.concat(res));
            emits("update:loading", false);
          } else {
            data.loadMode = "noMore";
            if (props.dataList.length == 0)
              emits("update:loading", false);
          }
        });
      }
    };
    expose({
      loadMore: methods.loadMore
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !__props.loading && __props.dataList.length == 0
      }, !__props.loading && __props.dataList.length == 0 ? {
        b: common_vendor.p({
          text: __props.emptyText,
          icon: __props.emtpyIcon,
          size: __props.emtpyIconSize
        })
      } : {}, {
        c: common_vendor.f(__props.dataList, (n, i, i0) => {
          return {
            a: "d-" + i0,
            b: common_vendor.r("d", {
              index: i,
              item: n
            }, i0),
            c: __props.forKey || i
          };
        }),
        d: common_vendor.p({
          show: __props.loading,
          emptyText: __props.noMore,
          moreText: __props.loadMore,
          mode: data.loadMode
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/前端项目/朝暮订阅/components/alist/alist.vue"]]);
wx.createComponent(Component);
