"use strict";
const common_vendor = require("../../common/vendor.js");
const common_script_req_promise = require("../../common/script/req.promise.js");
const common_script_tip = require("../../common/script/tip.js");
const common_script_tools = require("../../common/script/tools.js");
require("../../common/script/cache.js");
if (!Array) {
  const _easycom_alist2 = common_vendor.resolveComponent("alist");
  const _easycom_aimg2 = common_vendor.resolveComponent("aimg");
  const _easycom_atab2 = common_vendor.resolveComponent("atab");
  (_easycom_alist2 + _easycom_aimg2 + _easycom_atab2)();
}
const _easycom_alist = () => "../../components/alist/alist.js";
const _easycom_aimg = () => "../../components/aimg/aimg.js";
const _easycom_atab = () => "../../components/atab/atab.js";
if (!Math) {
  (_easycom_alist + _easycom_aimg + _easycom_atab)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const data = common_vendor.reactive({
      step: 0,
      region: { loading: true, list: [], i: 0 },
      // loadings: [true, true],
      // cate: [],
      payTypes: {
        tab: { items: [], i: 0, ready: false },
        loading: [],
        lists: [],
        sels: [-1, -1],
        // 选中的套餐
        text: ""
        // 订购须知
      }
    });
    const pureData = {
      DataList: { step0: null, step1: [] },
      pages: [],
      cates: []
    };
    const methods = {
      _getDataList(key, i = -1) {
        let dl = null;
        return new Promise((resolve) => {
          const siv = setInterval(() => {
            dl = i > -1 ? pureData.DataList[key][i] : pureData.DataList[key];
            if (dl) {
              clearInterval(siv);
              resolve(dl);
            }
          }, 30);
        });
      },
      _tab(i) {
        data.payTypes.tab.ready = true;
        if (pureData.pages[i] == 1) {
          pureData.pages[i] = 0;
          methods._getDataList("step1", i).then((dl) => {
            const { b_id } = pureData.cates[i];
            const { a_id } = data.region.list[data.region.i];
            dl.loadMore(() => {
              return common_script_req_promise.__get(common_script_req_promise.payType, { b_id, a_id }).then((res) => {
                return res.list;
              });
            });
          });
        }
      },
      _loadPayTypes() {
        common_script_req_promise.__post(common_script_req_promise.baseConfig, { key: ["know"] }).then((res) => {
          data.payTypes.text = res.know;
        });
        return common_script_req_promise.__get(common_script_req_promise.goodsCate).then((res) => {
          pureData.cates = res.list;
          const len = res.list.length;
          data.payTypes.lists = Array(len).fill([]);
          data.payTypes.loadings = Array(len).fill(true);
          pureData.DataList.step1 = Array(len).fill(null);
          pureData.pages = Array(len).fill(1);
          data.payTypes.tab.items = res.list.map((n) => n.b_name);
        });
      },
      _pickRegion(i) {
        if (i > -1) {
          data.region.i = i;
          methods._loadPayTypes().then(() => {
            common_vendor.nextTick$1(() => {
              data.step = 1;
            });
          });
        }
      },
      _pay() {
        const [index, i] = data.payTypes.sels;
        if (index == -1) {
          common_script_tip._tip("请选择订阅类型");
        } else {
          const { a_id } = data.region.list[data.region.i];
          const { s_id } = data.payTypes.lists[index][i];
          common_script_req_promise.__post(common_script_req_promise.payCommit, { a_id, s_id }).then((res) => {
            common_vendor.index.requestPayment(res).then(() => {
              common_script_tools.globalData({ indexPageRefresh: true, myPageRefresh: true });
              common_script_tip._tip("订阅成功").then(() => {
                common_script_tip._go("/pages/index/index", 3);
              });
            }).catch((err) => {
              common_script_tip._tip("订阅失败");
            });
          }).catch((err) => {
            common_script_tip._tip(err.msg);
          });
        }
      }
    };
    common_vendor.onShow(() => {
      data.step = 0;
      const opt = common_script_tools.globalData(["payTypesTab", "payTypesRegion"]);
      const siv = setInterval(() => {
        if (data.region.list.length) {
          if (opt.payTypesRegion)
            methods._pickRegion(data.region.list.findIndex((r) => r.a_id == opt.payTypesRegion));
          if (opt.payTypesTab)
            data.payTypes.tab.i = opt.payTypesTab;
          clearInterval(siv);
          common_script_tools.globalData({ payTypesTab: 0, payTypesRegion: 0 });
        }
      }, 30);
    });
    common_vendor.onLoad(() => {
      methods._getDataList("step0").then((dl) => {
        dl.loadMore(() => {
          return common_script_req_promise.__get(common_script_req_promise.payRegion).then((res) => {
            return res.list;
          });
        });
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: data.step == 0
      }, data.step == 0 ? {
        b: common_vendor.w(({
          index: i,
          item: n
        }, s0, i0) => {
          return {
            a: common_vendor.t(i + 1),
            b: common_vendor.t(n.a_name),
            c: common_vendor.t(n.a_name_en),
            d: common_vendor.o(($event) => methods._pickRegion(i)),
            e: i % 2 == 0 ? 1 : "",
            f: i0,
            g: s0
          };
        }, {
          name: "d",
          path: "b",
          vueId: "d7fd7b38-0"
        }),
        c: common_vendor.sr((el) => pureData.DataList.step0 = el, "d7fd7b38-0"),
        d: (el) => pureData.DataList.step0 = el,
        e: common_vendor.o(($event) => data.region.list = $event),
        f: common_vendor.o(($event) => data.region.loading = $event),
        g: common_vendor.p({
          dataList: data.region.list,
          loading: data.region.loading
        })
      } : {}, {
        h: data.step == 1
      }, data.step == 1 ? common_vendor.e({
        i: data.payTypes.tab.items.length
      }, data.payTypes.tab.items.length ? {
        j: common_vendor.w(({
          index
        }, s0, i0) => {
          var _a, _b;
          return common_vendor.e(data.payTypes.tab.ready ? {
            a: common_vendor.w(({
              index: i,
              item: n
            }, s1, i1) => {
              return common_vendor.e({
                a: common_vendor.t(n.s_name),
                b: common_vendor.t(Math.floor(n.s_price)),
                c: common_vendor.t(Math.floor(n.s_original_price)),
                d: data.payTypes.sels[0] == index && data.payTypes.sels[1] == i
              }, data.payTypes.sels[0] == index && data.payTypes.sels[1] == i ? {
                e: "d7fd7b38-3-" + i0 + "-" + i1 + "," + ("d7fd7b38-2-" + i0),
                f: common_vendor.p({
                  src: "2_1_0",
                  svg: true
                })
              } : {}, {
                g: common_vendor.o(($event) => data.payTypes.sels = [index, i]),
                h: common_vendor.n((i - 1) % 3 == 0 ? "m-r-15 m-l-15" : ""),
                i: i1,
                j: s1
              });
            }, {
              name: "d",
              path: "j[" + i0 + "].a",
              vueId: "d7fd7b38-2-" + i0 + ",d7fd7b38-1"
            }),
            b: common_vendor.t((_b = (_a = data.region.list) == null ? void 0 : _a[data.region.i]) == null ? void 0 : _b.a_name),
            c: common_vendor.sr((el) => pureData.DataList.step1[index] = el, "d7fd7b38-2-" + i0 + ",d7fd7b38-1"),
            d: (el) => pureData.DataList.step1[index] = el,
            e: "d7fd7b38-2-" + i0 + ",d7fd7b38-1",
            f: common_vendor.o(($event) => data.payTypes.lists[index] = $event),
            g: common_vendor.o(($event) => data.payTypes.loadings[index] = $event),
            h: common_vendor.p({
              dataList: data.payTypes.lists[index],
              loading: data.payTypes.loadings[index]
            })
          } : {}, {
            i: i0,
            j: s0
          });
        }, {
          name: "content",
          path: "j",
          vueId: "d7fd7b38-1"
        }),
        k: data.payTypes.tab.ready,
        l: common_vendor.o(($event) => data.payTypes.tab.i = $event),
        m: common_vendor.p({
          underlineWidth: "25px",
          tabs: data.payTypes.tab.items,
          click: methods._tab,
          active: data.payTypes.tab.i
        })
      } : {}, {
        n: common_vendor.o(() => common_vendor.unref(common_script_tip._tip)("请联系客服~")),
        o: common_vendor.o((...args) => methods._pay && methods._pay(...args)),
        p: data.payTypes.text
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d7fd7b38"], ["__file", "F:/前端项目/朝暮订阅/pages/pay/index.vue"]]);
wx.createPage(MiniProgramPage);
