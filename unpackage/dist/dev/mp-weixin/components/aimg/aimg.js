"use strict";
const common_vendor = require("../../common/vendor.js");
const common_script_cache = require("../../common/script/cache.js");
const __default__ = {
  // 微信小程序组件默认设置
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true
  },
  externalClasses: ["class"]
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "aimg",
  props: {
    src: { type: [String, Number], default: "" },
    mode: { type: String, default: "aspectFill" },
    // 缩写支持
    local: { type: Boolean, default: false },
    png: { type: Boolean, default: false },
    jpg: { type: Boolean, default: false },
    svg: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const ready = common_vendor.ref(false);
    const finish = () => {
      ready.value = true;
    };
    const url = common_vendor.computed(() => {
      let { src, local } = props;
      if (local) {
        src = (common_script_cache.imgRootDir + src).replaceAll("//", "/");
      } else {
        ["png", "jpg", "svg"].forEach((mime) => {
          if (props[mime])
            src = `${common_script_cache.imgRootDir}/${mime}/${src}.${mime}`.replaceAll("//", "/");
        });
      }
      let flag = src.indexOf("http") == -1 && src.indexOf(common_script_cache.host) == -1 && src.indexOf("data:image") == -1;
      return flag && src.indexOf(common_script_cache.imgRootDir) == -1 ? (common_script_cache.host + src).replace(/\/\//g, "/").replace(/:\/([^\/])/, "://$1") : src;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(url),
        b: __props.mode,
        c: common_vendor.o(finish),
        d: !ready.value ? 1 : ""
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "F:/前端项目/朝暮订阅/components/aimg/aimg.vue"]]);
wx.createComponent(Component);
