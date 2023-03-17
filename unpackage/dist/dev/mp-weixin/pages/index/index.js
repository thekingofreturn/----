"use strict";
const common_vendor = require("../../common/vendor.js");
const common_script_req_promise = require("../../common/script/req.promise.js");
const common_script_cache = require("../../common/script/cache.js");
const common_script_tip = require("../../common/script/tip.js");
const common_script_tools = require("../../common/script/tools.js");
if (!Array) {
  const _easycom_asearchbar2 = common_vendor.resolveComponent("asearchbar");
  const _easycom_aimg2 = common_vendor.resolveComponent("aimg");
  const _easycom_alist2 = common_vendor.resolveComponent("alist");
  const _easycom_atab2 = common_vendor.resolveComponent("atab");
  (_easycom_asearchbar2 + _easycom_aimg2 + _easycom_alist2 + _easycom_atab2)();
}
const _easycom_asearchbar = () => "../../components/asearchbar/asearchbar.js";
const _easycom_aimg = () => "../../components/aimg/aimg.js";
const _easycom_alist = () => "../../components/alist/alist.js";
const _easycom_atab = () => "../../components/atab/atab.js";
if (!Math) {
  (_easycom_asearchbar + _easycom_aimg + _easycom_alist + _easycom_atab)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const User = common_script_cache.useCache();
    const data = common_vendor.reactive({
      tab: { items: [], i: 0 },
      lists: [],
      loadings: [],
      tabReady: false,
      region: { items: [], i: 0 }
      // 可选地区
    });
    const pureData = {
      cates: [],
      pages: [],
      DataLists: [],
      keyword: ""
    };
    const methods = {
      _search(keyword) {
        pureData.keyword = keyword;
        const len = data.tab.items.length;
        data.lists = Array(len).fill([]);
        data.loadings = Array(len).fill(true);
        pureData.pages = Array(len).fill(1);
        methods._tab(data.tab.i);
      },
      _region(e) {
        data.region.i = e.detail.value;
        methods._search(pureData.keyword);
      },
      _tab(i) {
        data.tabReady = true;
        if (i == data.tab.items.length - 1 && common_script_tools.globalData("myFavRefresh")) {
          common_script_tools.globalData({ myFavRefresh: false });
          data.lists[i] = [];
          pureData.pages[i] = 1;
        }
        const page = pureData.pages[i];
        let dl = null;
        if (page == 1) {
          const siv = setInterval(() => {
            dl = pureData.DataLists[i];
            if (dl) {
              clearInterval(siv);
              methods.more(i);
            }
          }, 30);
        }
      },
      more(i) {
        const page = pureData.pages[i];
        const { b_id } = pureData.cates[i];
        const { a_id } = data.region.items[data.region.i];
        const DataList = pureData.DataLists[i];
        const { keyword } = pureData;
        page && DataList.loadMore(() => {
          return common_script_req_promise.__get(common_script_req_promise.goodsList, { b_id, a_id, page, keyword }).then((res) => {
            pureData.pages[i] = res.length ? page + 1 : 0;
            return res;
          });
        });
      },
      _subscribe(index, i) {
        const { g_id } = data.lists[index][i];
        const { a_id } = data.region.items[data.region.i];
        common_script_req_promise.__get(common_script_req_promise.subscribeCommit, { g_id, a_id }).then((res) => {
          common_script_tip._tip("订阅成功");
          data.lists[index][i].conclude = 1;
          common_script_tools.globalData({ myFavRefresh: true });
        }).catch((err) => {
          common_script_tip._tip(err.msg);
          if (err.code == 20) {
            setTimeout(() => {
              common_script_tools.globalData({ payTypesTab: index, payTypesRegion: a_id });
              common_script_tip._go("/pages/pay/index", 3);
            }, 1e3);
          }
        });
      },
      _cancel(index, i) {
        const { g_id } = data.lists[index][i];
        const { a_id } = data.region.items[data.region.i];
        common_script_req_promise.__get(common_script_req_promise.subscribeCancel, { g_id, a_id }).then((res) => {
          common_script_tip._tip("取消订阅成功");
          if (index == data.tab.items.length - 1) {
            const [delG] = data.lists[index].splice(i, 1);
            let flag = true;
            data.lists.forEach((d, idx) => {
              if (idx != index && flag) {
                const _i = d.findIndex((_g) => _g.b_id == delG.b_id && _g.g_id == delG.g_id);
                if (_i > -1) {
                  flag = false;
                  data.lists[idx][_i].conclude = 0;
                }
              }
            });
          } else {
            data.lists[index][i].conclude = 0;
            common_script_tools.globalData({ myFavRefresh: true });
          }
        }).catch((err) => {
          common_script_tip._tip(err.msg);
        });
      },
      shareData() {
        const { uid = 0 } = User.data;
        return {
          path: `/pages/index/index?share_uid=${uid}`
        };
      },
      shareBind() {
        const { scene, query: { share_uid = 0 } } = common_vendor.index.getLaunchOptionsSync();
        if ([1007, 1011, 1012, 1013, 1025, 1036, 1047, 1048, 1049, 1096, 1154, 1155].includes(scene)) {
          if (share_uid) {
            console.log(share_uid + "yyyyyyyyyy");
            common_script_req_promise.__post(common_script_req_promise.bindShare, { share_uid, scene });
          }
        }
      }
    };
    common_vendor.onShow(() => {
      if (common_script_tools.globalData("indexPageRefresh")) {
        common_script_tools.globalData({ indexPageRefresh: false });
        methods._search(pureData.keyword);
      }
    });
    common_vendor.onLoad(() => {
      common_script_req_promise.__get(common_script_req_promise.goodsCate).then((res) => {
        const { list } = res;
        list.push({ b_id: 0, b_name: "我的订阅" });
        pureData.cates = list;
        const len = list.length;
        data.lists = Array(len).fill([]);
        data.loadings = Array(len).fill(true);
        pureData.pages = Array(len).fill(1);
        pureData.DataLists = Array(len).fill(null);
        data.tab.items = list.map((n) => n.b_name);
      });
      common_script_req_promise.__get(common_script_req_promise.payRegion).then((res) => {
        data.region.items = res.list;
      }).then(() => {
        const { top1_uid = 0 } = User.data;
        if (!top1_uid)
          methods.shareBind();
      });
    });
    common_vendor.onShareAppMessage(methods.shareData);
    common_vendor.onShareTimeline(methods.shareData);
    return (_ctx, _cache) => {
      var _a;
      return common_vendor.e({
        a: common_vendor.o(methods._search),
        b: common_vendor.t(data.region.i > -1 ? (_a = data.region.items[data.region.i]) == null ? void 0 : _a.a_name : "地区"),
        c: data.region.items,
        d: data.region.i,
        e: common_vendor.o((...args) => methods._region && methods._region(...args)),
        f: data.tab.items.length
      }, data.tab.items.length ? {
        g: common_vendor.w(({
          index
        }, s0, i0) => {
          return common_vendor.e(data.tabReady ? {
            a: common_vendor.w(({
              index: i,
              item: n
            }, s1, i1) => {
              return common_vendor.e({
                a: "1cf27b2a-3-" + i0 + "-" + i1 + "," + ("1cf27b2a-2-" + i0),
                b: common_vendor.p({
                  src: n.g_pic_long
                }),
                c: common_vendor.t(n.g_name)
              }, common_vendor.e({
                d: n.conclude
              }, n.conclude ? {
                e: common_vendor.o(($event) => methods._cancel(index, i))
              } : {
                f: "1cf27b2a-4-" + i0 + "-" + i1 + "," + ("1cf27b2a-2-" + i0),
                g: common_vendor.p({
                  src: "1_0",
                  svg: true
                }),
                h: common_vendor.o(($event) => methods._subscribe(index, i))
              }), {
                i: i1,
                j: s1
              });
            }, {
              name: "d",
              path: "g[" + i0 + "].a",
              vueId: "1cf27b2a-2-" + i0 + ",1cf27b2a-1"
            }),
            b: common_vendor.sr((el) => pureData.DataLists[index] = el, "1cf27b2a-2-" + i0 + ",1cf27b2a-1"),
            c: (el) => pureData.DataLists[index] = el,
            d: "1cf27b2a-2-" + i0 + ",1cf27b2a-1",
            e: common_vendor.o(($event) => data.lists[index] = $event),
            f: common_vendor.o(($event) => data.loadings[index] = $event),
            g: common_vendor.p({
              dataList: data.lists[index],
              loading: data.loadings[index]
            })
          } : {}, {
            h: i0,
            i: s0
          });
        }, {
          name: "content",
          path: "g",
          vueId: "1cf27b2a-1"
        }),
        h: data.tabReady,
        i: common_vendor.o(($event) => data.tab.i = $event),
        j: common_vendor.p({
          tabs: data.tab.items,
          click: methods._tab,
          reachBottom: methods.more,
          active: data.tab.i
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "F:/前端项目/朝暮订阅/pages/index/index.vue"]]);
_sfc_main.__runtimeHooks = 6;
wx.createPage(MiniProgramPage);
