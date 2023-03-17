"use strict";
const common_vendor = require("../../common/vendor.js");
const __default__ = {
  options: {
    styleIsolation: "apply-shared",
    virtualHost: true
  },
  externalClasses: ["class"]
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "atab",
  props: {
    tabs: { type: Array, default() {
      return ["选项1", "选项2"];
    } },
    active: { type: Number, default: 0 },
    // 当前tab索引所在
    touch: { type: Boolean, default: true },
    // 是否启用滑动切换tab
    hasContentBox: { type: Boolean, default: true },
    // 是否包含tab对应内容box
    click: Function,
    // 点击tab
    reachBottom: Function,
    // 某tab内容到达底部
    ready: Function,
    // 初始化完成后调用
    underlineWidth: { type: String, default: "60px" }
    // active下划线宽度，单位仅支持px
  },
  emits: ["update:active"],
  setup(__props, { emit: emits }) {
    const props = __props;
    common_vendor.useCssVars((_ctx) => ({
      "c88ac856": __props.underlineWidth
    }));
    const salt = Date.now();
    const datas = common_vendor.reactive({
      scrollTo: "",
      tabOffsetTop: 0,
      scrollLeft: 0,
      getId: (i) => {
        return `tab-tit-${salt}-${i}`;
      },
      isReady: false
      // 初始化完成  
    });
    let touch = {
      x: 0,
      y: 0,
      distance: 95
      // 移动的像素值
    };
    const _event = {
      async tap(e, isReady = false) {
        let { dataset: { i }, id = 0 } = e.currentTarget;
        id || (id = datas.getId(i));
        try {
          let { width = 0, offsetLeft = 0 } = tabBounds[id];
          datas.scrollLeft = offsetLeft + width / 2 - props.underlineWidth.replace("px", "") / 2;
          if (isReady || i != props.active) {
            emits("update:active", i);
            datas.scrollTo = datas.getId(i < 3 ? 0 : i - 1);
            props.click && props.click(i);
          }
        } catch (e2) {
          console.log(e2);
        }
      },
      loadmore() {
        props.reachBottom && props.reachBottom(props.active);
      },
      touch: {
        start(e) {
          if (props.touch) {
            ({ pageX: touch.x, pageY: touch.y } = e.changedTouches[0]);
          }
        },
        end(e) {
          if (props.touch) {
            let { pageX, pageY } = e.changedTouches[0];
            let x = pageX - touch.x;
            if (Math.abs(x) > touch.distance) {
              let i = -1;
              if (x > 0) {
                if (props.active > 0) {
                  i = props.active - 1;
                }
              } else {
                if (props.active < props.tabs.length - 1) {
                  i = props.active + 1;
                }
              }
              i < 0 || _event.tap({ currentTarget: { dataset: { i } } });
            }
          }
        }
      }
    };
    let tabBounds = {};
    const { ctx } = common_vendor.getCurrentInstance();
    const getBoundRect = (el) => {
      return new Promise((resolve) => {
        const query = common_vendor.index.createSelectorQuery().in(ctx);
        query.select(el).boundingClientRect((data) => {
          let { width, left: offsetLeft, top } = data;
          resolve({ width, offsetLeft, top });
        }).exec();
      });
    };
    const tabReady = async () => {
      if (!datas.isReady) {
        for (let i = 0; i < props.tabs.length; i++) {
          let id = datas.getId(i);
          tabBounds[id] = await getBoundRect(`#${id}`);
        }
      }
      return new Promise((resolve) => {
        if (!datas.isReady) {
          let vals = Object.values(tabBounds);
          vals[0].offsetLeft = 0;
          vals.unshift({ width: 0, offsetLeft: 0 });
          Object.keys(tabBounds).forEach((k, i) => {
            tabBounds[k].offsetLeft = vals.filter((t, ii) => ii <= i).reduce((p, c) => {
              return { offsetLeft: p.offsetLeft + c.width, width: c.width };
            }).offsetLeft;
          });
          getBoundRect(".tab-box").then((res) => {
            datas.tabOffsetTop = res.top;
          });
          datas.isReady = true;
          props.ready && props.ready();
        }
        resolve();
      });
    };
    common_vendor.watch(() => props.active, (i) => {
      if (props.active != i) {
        if (datas.isReady) {
          _event.tap({ currentTarget: { dataset: { i } } }, true);
        } else {
          props.active = i;
        }
      }
    });
    common_vendor.onMounted(() => {
      if (props.tabs.length) {
        tabReady().then(() => {
          _event.tap({ currentTarget: { dataset: { i: props.active } } }, true);
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s(`--left:${datas.scrollLeft}px`),
        b: common_vendor.f(__props.tabs, (t, i, i0) => {
          return {
            a: common_vendor.t(t),
            b: common_vendor.o((...args) => _event.tap && _event.tap(...args), i),
            c: i,
            d: i,
            e: i == props.active ? 1 : "",
            f: datas.getId(i)
          };
        }),
        c: common_vendor.s(__props.tabs.length <= 4 ? `--tab-tit-width:${(100 / __props.tabs.length).toFixed(2)}%` : ""),
        d: datas.scrollTo,
        e: __props.hasContentBox
      }, __props.hasContentBox ? {
        f: common_vendor.f(__props.tabs, (t, index, i0) => {
          return {
            a: "content-" + i0,
            b: common_vendor.r("content", {
              index
            }, i0),
            c: index,
            d: common_vendor.o((...args) => _event.loadmore && _event.loadmore(...args), index),
            e: common_vendor.o((...args) => _event.touch.start && _event.touch.start(...args), index),
            f: common_vendor.o((...args) => _event.touch.end && _event.touch.end(...args), index)
          };
        }),
        g: common_vendor.s(`width: ${750 * __props.tabs.length}rpx; left: ${props.active * -750}rpx;`)
      } : {}, {
        h: common_vendor.s(`--tab-offset-top:${datas.tabOffsetTop}px`),
        i: common_vendor.s(_ctx.__cssVars())
      });
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a53db3a0"], ["__file", "F:/前端项目/朝暮订阅/components/atab/atab.vue"]]);
wx.createComponent(Component);
