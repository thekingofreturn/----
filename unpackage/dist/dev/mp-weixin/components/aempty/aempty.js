"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "aempty",
  props: {
    text: String,
    icon: { type: String, default: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTg1NS42IDQyNy4ySDE2OC41Yy0xMi43IDAtMjQuNCA2LjktMzAuNiAxOEw0LjQgNjg0LjdDMS41IDY4OS45IDAgNjk1LjggMCA3MDEuOHYyODcuMWMwIDE5LjQgMTUuNyAzNS4xIDM1LjEgMzUuMUg5ODljMTkuNCAwIDM1LjEtMTUuNyAzNS4xLTM1LjFWNzAxLjhjMC02LTEuNS0xMS44LTQuNC0xNy4xTDg4Ni4yIDQ0NS4yYy02LjItMTEuMS0xNy45LTE4LTMwLjYtMTh6TTY3My40IDY5NS42Yy0xNi41IDAtMzAuOCAxMS41LTM0LjMgMjcuNy0xMi43IDU4LjUtNjQuOCAxMDIuMy0xMjcuMiAxMDIuM3MtMTE0LjUtNDMuOC0xMjcuMi0xMDIuM2MtMy41LTE2LjEtMTcuOC0yNy43LTM0LjMtMjcuN0gxMTljLTI2LjQgMC00My4zLTI4LTMxLjEtNTEuNGw4MS43LTE1NS44YzYuMS0xMS42IDE4LTE4LjggMzEuMS0xOC44aDYyMi40YzEzIDAgMjUgNy4yIDMxLjEgMTguOGw4MS43IDE1NS44YzEyLjIgMjMuNC00LjcgNTEuNC0zMS4xIDUxLjRINjczLjR6TTgxOS45IDIwOS41Yy0xLTEuOC0yLjEtMy43LTMuMi01LjUtOS44LTE2LjYtMzEuMS0yMi4yLTQ3LjgtMTIuNkw2NDguNSAyNjFjLTE3IDkuOC0yMi43IDMxLjYtMTIuNiA0OC40IDAuOSAxLjQgMS43IDIuOSAyLjUgNC40IDkuNSAxNyAzMS4yIDIyLjggNDggMTNMODA3IDI1Ny4zYzE2LjctOS43IDIyLjQtMzEgMTIuOS00Ny44ek0zNzUuNCAyNjEuMUwyNTUgMTkxLjZjLTE2LjctOS42LTM4LTQtNDcuOCAxMi42LTEuMSAxLjgtMi4xIDMuNi0zLjIgNS41LTkuNSAxNi44LTMuOCAzOC4xIDEyLjkgNDcuOEwzMzcuMyAzMjdjMTYuOSA5LjcgMzguNiA0IDQ4LTEzLjEgMC44LTEuNSAxLjctMi45IDIuNS00LjQgMTAuMi0xNi44IDQuNS0zOC42LTEyLjQtNDguNHpNNTEyIDIzOS4zaDIuNWMxOS41IDAuMyAzNS41LTE1LjUgMzUuNS0zNS4xdi0xMzljMC0xOS4zLTE1LjYtMzQuOS0zNC44LTM1LjFoLTYuNEM0ODkuNiAzMC4zIDQ3NCA0NiA0NzQgNjUuMnYxMzljMCAxOS41IDE1LjkgMzUuNCAzNS41IDM1LjFoMi41eiIgZmlsbD0iI2NkY2RjZCI+PC9wYXRoPjwvc3ZnPg==" },
    size: { type: Number, default: 100 }
    // 设置图标的宽度单位rpx
  },
  setup(__props) {
    const props = __props;
    const data = common_vendor.reactive({
      height: 0
    });
    const _load = (img) => {
      const { width, height } = img.detail;
      data.height = height / width * props.size;
    };
    return (_ctx, _cache) => {
      return {
        a: __props.icon,
        b: common_vendor.o(_load),
        c: common_vendor.t(__props.text || "数据为空~"),
        d: common_vendor.s(`--width:${__props.size}rpx;--height:${data.height || __props.size}rpx;`)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-28f0e17c"], ["__file", "F:/前端项目/朝暮订阅/components/aempty/aempty.vue"]]);
wx.createComponent(Component);
