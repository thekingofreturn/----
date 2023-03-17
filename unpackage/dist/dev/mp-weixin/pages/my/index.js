"use strict";
const common_vendor = require("../../common/vendor.js");
const common_script_req_promise = require("../../common/script/req.promise.js");
const common_script_tools = require("../../common/script/tools.js");
require("../../common/script/cache.js");
if (!Array) {
  const _easycom_auserbar2 = common_vendor.resolveComponent("auserbar");
  const _easycom_aimg2 = common_vendor.resolveComponent("aimg");
  (_easycom_auserbar2 + _easycom_aimg2)();
}
const _easycom_auserbar = () => "../../components/auserbar/auserbar.js";
const _easycom_aimg = () => "../../components/aimg/aimg.js";
if (!Math) {
  (_easycom_auserbar + _easycom_aimg)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const data = common_vendor.reactive({
      user: {},
      qrcode: "",
      orders: []
    });
    const pureData = {
      refresh: false
    };
    common_vendor.onShow(() => {
      if (common_script_tools.globalData("myPageRefresh")) {
        common_script_tools.globalData({ indexPageRefresh: false });
        pureData.refresh = true;
      }
      if (pureData.refresh) {
        pureData.refresh = false;
        common_script_req_promise.__get(common_script_req_promise.orderList).then((res) => {
          data.orders = res.list;
        });
      }
    });
    common_vendor.onLoad(() => {
      pureData.refresh = true;
      common_script_req_promise.__get(common_script_req_promise.userId).then((res) => {
        data.user = res.user_info;
      });
      common_script_req_promise.__post(common_script_req_promise.baseConfig, { key: ["staff_qrcode"] }).then((res) => {
        data.qrcode = res.staff_qrcode;
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.orders.length == 0
      }, data.orders.length == 0 ? {
        b: common_vendor.p({
          src: "3_2_0",
          svg: true
        })
      } : {}, {
        c: common_vendor.f(data.orders, (n, k0, i0) => {
          return {
            a: common_vendor.t(n.b_name),
            b: common_vendor.t(n.s_name),
            c: common_vendor.t(n.use_state_txt),
            d: common_vendor.t(n.a_name),
            e: common_vendor.t(n.end_date)
          };
        }),
        d: common_vendor.p({
          src: data.qrcode
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-f97bc692"], ["__file", "F:/前端项目/朝暮订阅/pages/my/index.vue"]]);
wx.createPage(MiniProgramPage);
