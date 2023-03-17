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
const __default__ = {
  // 微信小程序组件默认设置
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true
  },
  externalClasses: ["class"]
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "asearchbar",
  props: {
    clearIcon: { type: String, default: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUxMiAwQzIyOS4yNDAwMSAwIDAgMjI5LjI0MDAxIDAgNTEyYzAgMjgyLjgyODcyNCAyMjkuMjQwMDEgNTEyIDUxMiA1MTIgMjgyLjgyODcyNCAwIDUxMi0yMjkuMTcxMjc2IDUxMi01MTJDMTAyMy45OTc4NTIgMjI5LjI0MDAxIDc5NC44MjY1NzYgMCA1MTIgMHpNNzQ5LjIyNjAxNSAzMjMuMDM3OTc5bC0xOTAuMjU5MzcxIDE5MC4zMjgxMDUgMTY4LjQxMjc3MiAxODcuNTk1OTM3YzEzLjMxMjg3MiAxMy4zMTI4NzIgMTMuMzEyODcyIDM1LjAxOTg1NiAwIDQ4LjI2Mzk5NC0xMy4yNDQxMzggMTMuMzEyODcyLTM0Ljk1MzI3IDEzLjMxMjg3Mi00OC4xOTUyNiAwbC0xNjguNDEyNzcyLTE4Ny41OTU5MzctMTg3LjY2NDY3MSAxODcuNTk1OTM3Yy0xMy4zMTI4NzIgMTMuMzEyODcyLTM0Ljk1MzI3IDEzLjMxMjg3Mi00OC4yNjM5OTQgMC0xMy4zMTI4NzItMTMuMjQ0MTM4LTEzLjMxMjg3Mi0zNC45NTMyNyAwLTQ4LjI2Mzk5NGwxOTAuMjU5MzcxLTE5MC4yNTkzNzEtMTY4LjM0NjE4Ni0xODcuNjY0NjcxYy0xMy4zMTI4NzItMTMuMzEyODcyLTEzLjMxMjg3Mi0zNC45NTMyNyAwLTQ4LjI2Mzk5NHMzNC45NTMyNy0xMy4zMTI4NzIgNDguMjYzOTk0IDBsMTY4LjQxMjc3MiAxODcuNjY0NjcxIDE4Ny41OTU5MzctMTg3LjY2NDY3MWMxMy4zMTI4NzItMTMuMzEyODcyIDM0Ljk1MzI3LTEzLjMxMjg3MiA0OC4yNjM5OTQgMEM3NjIuNjA1NDczIDI4OC4wODQ3MDkgNzYyLjUzNjczOSAzMDkuNzI1MTA3IDc0OS4yMjYwMTUgMzIzLjAzNzk3OXoiIGZpbGw9IiNjZGNkY2QiPjwvcGF0aD48L3N2Zz4=" },
    searchIcon: { type: String, default: "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY4My44MDM0MDEgMjE3LjE4MzY1OWMtNjMuMTEwNDIxLTYzLjExNDAzNC0xNTAuMzA5MDEtMTAyLjE2ODgtMjQ2LjU4NTgxOC0xMDIuMTY4OC05Ni4yODc2NDYgMC0xODMuNDg5ODQ3IDM5LjA1ODM3OS0yNDYuNjAwMjY4IDEwMi4xNjg4LTYzLjExMDQyMSA2My4xMDY4MDktMTAyLjE2ODggMTUwLjMwOTAxLTEwMi4xNjg4IDI0Ni42MDM4ODEgMCA5Ni4yNjIzNTggMzkuMDU4Mzc5IDE4My40NzkwMDkgMTAyLjE2ODggMjQ2LjU3MTM2OCA2My4xMDY4MDkgNjMuMTIxMjU5IDE1MC4zMzA2ODUgMTAyLjE3OTYzNyAyNDYuNjAwMjY4IDEwMi4xNzk2MzcgOTYuMjczMTk2IDAgMTgzLjQ3NTM5Ny0zOS4wNjE5OTEgMjQ2LjU4NTgxOC0xMDIuMTc5NjM3IDYzLjEwNjgwOS02My4wOTU5NzEgMTAyLjE2NTE4Ny0xNTAuMzA5MDEgMTAyLjE2NTE4Ny0yNDYuNTcxMzY4Qzc4NS45Njg1ODggMzY3LjUxMDczMiA3NDYuOTEwMjEgMjgwLjI5MDQ2OCA2ODMuODAzNDAxIDIxNy4xODM2NTlNNDM3LjIxNzU4MyA0OS45NTM2ODdjMTE0LjI1NjIzNCAwIDIxNy43MzI3NTkgNDYuMzQxMTg0IDI5Mi42MDU0ODkgMTIxLjIwNjY4OSA3NC44NjkxMTcgNzQuODY1NTA1IDEyMS4yMDY2ODkgMTc4LjM3ODE1NiAxMjEuMjA2Njg5IDI5Mi42MjM1NTIgMCA4My45OTA2ODctMjUuMDUyNzA2IDE2Mi4xNzk2OTQtNjguMDc3NjEyIDIyNy40NDY3NzkgNzUuNzI4ODkzIDc2Ljk0OTkxOSAxMjEuMDk4MzE0IDEyMy40NzUzNCAxOTYuODU2MTA3IDIwMC40MzI0ODQgNDYuODUwNTQ3IDQ1LjU4NjE3MS0xNi43OTgxMzcgMTExLjYxOTEwNy02NC41MzczNiA2NC41MzM3NDdsLTE5MC45MzE2MDItMTk0LjQxNzY2N2MtNzQuNDE3NTU1IDcxLjY3NTY2NS0xNzUuNjQ3MTA0IDExNS44MDU5OTctMjg3LjEyMTcxIDExNS44MDU5OTctMTE0LjI0NTM5NiAwLTIxNy43NTQ0MzQtNDYuMzM3NTcxLTI5Mi42MTk5MzktMTIxLjIwNjY4OS03NC44NjU1MDUtNzQuODYxODkyLTEyMS4yMTM5MTQtMTc4LjM0OTI1Ni0xMjEuMjEzOTE0LTI5Mi41OTgyNjQgMC0xMTQuMjcwNjg0IDQ2LjM0ODQwOS0yMTcuNzYxNjU5IDEyMS4yMTM5MTQtMjkyLjYyMzU1MlMzMjIuOTUwNTEyIDQ5Ljk1MzY4NyA0MzcuMjE3NTgzIDQ5Ljk1MzY4N3oiIGZpbGw9IiNDQ0NDQ0MiPjwvcGF0aD48L3N2Zz4=" },
    clearBtn: { type: Boolean, default: true },
    searchBtn: { type: Boolean, default: false },
    searchBtnText: { type: String, default: "搜索" },
    placeholder: { type: String, default: "请输入搜索内容" },
    value: { type: String, default: "" }
  },
  emits: ["update:value", "search"],
  setup(__props, { emit: emits }) {
    const data = common_vendor.reactive({
      value: "",
      show: { clearBtn: false }
    });
    const methods = {
      _input(e) {
        const { value } = e.detail;
        data.value = value;
        emits("update:value", value);
        data.show.clearBtn = value.length > 0;
        if (!value.length)
          methods._confirm();
      },
      _confirm() {
        emits("search", data.value);
      },
      _clear() {
        methods._input({ detail: { value: "" } });
        methods._confirm();
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          src: __props.searchIcon
        }),
        b: __props.placeholder,
        c: common_vendor.o((...args) => methods._input && methods._input(...args)),
        d: data.value,
        e: common_vendor.o((...args) => methods._confirm && methods._confirm(...args)),
        f: __props.clearBtn && data.show.clearBtn
      }, __props.clearBtn && data.show.clearBtn ? {
        g: common_vendor.p({
          src: __props.clearIcon
        }),
        h: common_vendor.o((...args) => methods._clear && methods._clear(...args))
      } : {});
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1266fbe1"], ["__file", "F:/前端项目/朝暮订阅/components/asearchbar/asearchbar.vue"]]);
wx.createComponent(Component);
