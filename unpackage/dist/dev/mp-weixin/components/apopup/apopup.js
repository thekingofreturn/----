"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_aimg2 = common_vendor.resolveComponent("aimg");
  _easycom_aimg2();
}
const _easycom_aimg = () => "../aimg/aimg.js";
if (!Math) {
  _easycom_aimg();
}
const _sfc_main = {
  __name: "apopup",
  props: {
    mask: { type: Boolean, default: true },
    // 遮罩
    closeIcon: { type: Boolean, default: false },
    // 关闭图标
    position: { type: String, default: "center" },
    // top,left,right,center,botoom
    show: { type: Boolean, default: true }
  },
  emits: ["update:show"],
  setup(__props, { emit: emits }) {
    const _close = () => {
      emits("update:show", false);
    };
    const icon = "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU2OS41Nzg4MzEgNTEybDM3OC4yMTM4OTItMzc4LjIxMzg5MmMxNS44MDU5NTQtMTUuODA1OTU0IDE1LjgwNTk1NC00MS43NzI4NzggMC01Ny41Nzg4MzFzLTQxLjc3Mjg3OC0xNS44MDU5NTQtNTcuNTc4ODMxIDBsLTM3OC4yMTM4OTIgMzc4LjIxMzg5Mi0zNzguMjEzODkyLTM3OC4yMTM4OTJjLTE1LjgwNTk1NC0xNS44MDU5NTQtNDEuNzcyODc4LTE1LjgwNTk1NC01Ny41Nzg4MzEgMGwwIDBjLTE1LjgwNTk1NCAxNS44MDU5NTQtMTUuODA1OTU0IDQxLjc3Mjg3OCAwIDU3LjU3ODgzMWwzNzguMjEzODkyIDM3OC4yMTM4OTItMzc4LjIxMzg5MiAzNzguMjEzODkyYy0xNS44MDU5NTQgMTUuODA1OTU0LTE1LjgwNTk1NCA0MS43NzI4NzggMCA1Ny41Nzg4MzFsMCAwYzE1LjgwNTk1NCAxNS44MDU5NTQgNDEuNzcyODc4IDE1LjgwNTk1NCA1Ny41Nzg4MzEgMGwzNzguMjEzODkyLTM3OC4yMTM4OTIgMzc4LjIxMzg5MiAzNzguMjEzODkyYzE1LjgwNTk1NCAxNS44MDU5NTQgNDEuNzcyODc4IDE1LjgwNTk1NCA1Ny41Nzg4MzEgMGwwIDBjMTUuODA1OTU0LTE1LjgwNTk1NCAxNS44MDU5NTQtNDEuNzcyODc4IDAtNTcuNTc4ODMxTDU2OS41Nzg4MzEgNTEyeiIgZmlsbD0iIzk5OSI+PC9wYXRoPjwvc3ZnPg==";
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show
      }, __props.show ? common_vendor.e({
        b: __props.closeIcon
      }, __props.closeIcon ? {
        c: common_vendor.p({
          src: icon
        }),
        d: common_vendor.o(_close)
      } : {}, {
        e: common_vendor.o(() => {
        }),
        f: common_vendor.n(__props.position == "center" ? "flex center" : __props.position),
        g: common_vendor.o(_close),
        h: common_vendor.o(() => {
        })
      }) : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c17ecf0a"], ["__file", "F:/前端项目/朝暮订阅/components/apopup/apopup.vue"]]);
wx.createComponent(Component);
