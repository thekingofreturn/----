"use strict";
const common_vendor = require("../../common/vendor.js");
const common_script_req_promise = require("../../common/script/req.promise.js");
const common_script_cache = require("../../common/script/cache.js");
if (!Array) {
  const _easycom_aimg2 = common_vendor.resolveComponent("aimg");
  const _easycom_apopup2 = common_vendor.resolveComponent("apopup");
  (_easycom_aimg2 + _easycom_apopup2)();
}
const _easycom_aimg = () => "../aimg/aimg.js";
const _easycom_apopup = () => "../apopup/apopup.js";
if (!Math) {
  (_easycom_aimg + _easycom_apopup)();
}
const _sfc_main = {
  __name: "auserbar",
  props: {
    avatar: { type: String, default: "" },
    nickname: { type: String, default: "" },
    keys: { type: Object, default() {
      return { avatarKey: "", nicknameKey: "" };
    } },
    refreshCache: { type: Boolean, default: false }
  },
  setup(__props) {
    const props = __props;
    const uri = {
      update: "user/setUserInfo",
      get: "user/getUserInfo"
      // upload: 'Upload/addimage',
    };
    const User = common_script_cache.useCache();
    const data = common_vendor.reactive({
      avatar: "",
      nickname: "",
      popup: { show: false }
    });
    const pureData = {
      keys: { avatarKey: "avatarurl", nicknameKey: "nickname" },
      avatar: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+EAWEV4aWYAAE1NACoAAAAIAAIBEgADAAAAAQABAACHaQAEAAAAAQAAACYAAAAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAASygAwAEAAAAAQAAASwAAAAA/9sAQwAHBQUGBQQHBgYGCAcHCAsSCwsKCgsWDxANEhoWGxoZFhkYHCAoIhweJh4YGSMwJCYqKy0uLRsiMjUxLDUoLC0s/8AACwgAhACEAQERAP/EABoAAQEBAQEBAQAAAAAAAAAAAAAEAwEFAgf/xAAkEAEAAgIBBAEFAQAAAAAAAAAAAQIDEQQhM0FxEhMiMVFhgf/aAAgBAQAAPwD9vtabWm1p3M+HAAAAAV8XJeuGYi062kCIAACIAIgU8btz7TAAAAAKeN259pgAfVMdsk6rG4htHEtrraJctxbxHSYlhMTWdTGoAAU8btz7TABEbmIjy9ClIx0isPoY8nHFsfy81RgAp43bn2mAGmCN56rgctG6zH9ecACnjdufaYAaYLfHNWZXA5efjSZnxDzgAU8btz7TAAuw5PqY9+Y/LQTcrL0+nH+pgAU8btz7TAA0wWmuWIjz0XOWn40mf1DzpmbTMzO5kABTxu3PpMAO1pa86rGlWHj/AE5+Vp3ZuJcvGmOtOsfpPManU9AAU8btz7TAREzOo6qMfFmet+n8U1rWsarGodAfF8VckfdH+pcnHtjjcfdX9sgFPG7c+0wK+NjitIv5luAAI+TjilotHTbEFPG7c+0wLePeJw1jfWPw10bNmzZs2bS8q0TNYidzCcFPG7c+0wAAAACnjdufaYAAAABTxu3PtMAAAAAp43bn2xzUjHnvSPxE9XwAAAAD0+DgpbjRad7mX//Z",
      nickname: "点击设置昵称"
    };
    const methods = {
      _avatar(e) {
        const { avatarUrl } = e.detail;
        common_script_req_promise.__postImage(avatarUrl).then((res) => {
          const avatar = res;
          const post = { [pureData.keys.avatarKey]: avatar };
          common_script_req_promise.__post(uri.update, post).then((res2) => {
            User.data = post;
            data.avatar = avatar;
          });
        });
      },
      _nickname(e) {
        const { nickname } = e.detail.value;
        if (nickname && nickname != pureData.nickname) {
          data.popup.show = false;
          const post = { [pureData.keys.nicknameKey]: nickname };
          common_script_req_promise.__post(uri.update, post).then((res) => {
            User.data = post;
            data.nickname = nickname;
          });
        }
      }
    };
    common_vendor.onMounted(() => {
      const { keys, refreshCache, avatar, nickname } = props;
      for (const [k, v] of Object.entries(keys)) {
        if (v)
          pureData.keys[k] = v;
      }
      const { avatarKey, nicknameKey } = pureData.keys;
      if (refreshCache) {
        __get(uri.get).then((res) => {
          const u = res.userinfo || res;
          data.avatar = u[avatarKey];
          data.nickname = u[nicknameKey];
        });
      }
      data.avatar = avatar || User.data[avatarKey] || pureData.avatar;
      data.nickname = nickname || User.data[nicknameKey] || pureData.nickname;
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: data.avatar
        }),
        b: common_vendor.o((...args) => methods._avatar && methods._avatar(...args)),
        c: common_vendor.t(data.nickname),
        d: common_vendor.o(($event) => data.popup.show = true),
        e: common_vendor.o((...args) => methods._nickname && methods._nickname(...args)),
        f: common_vendor.o(($event) => data.popup.show = $event),
        g: common_vendor.p({
          position: "bottom",
          closeIcon: true,
          show: data.popup.show
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-74e74b46"], ["__file", "F:/前端项目/朝暮订阅/components/auserbar/auserbar.vue"]]);
wx.createComponent(Component);
