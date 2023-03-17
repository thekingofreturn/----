<template lang="pug">
view.user-bar.flex
  button.avatar.clear(@chooseavatar="methods._avatar" open-type="chooseAvatar"): aimg(:src="data.avatar")
  view.grow(@click="data.popup.show = true")
    view.nickname {{ data.nickname }}
    slot
  apopup(v-model:show="data.popup.show" position="bottom" closeIcon)
    form.form.block.mod(@submit="methods._nickname")
      view.m-b-25.small.center 设置昵称
      view.input: input(placeholder="请输入昵称" placeholder-class="placeholder" type="nickname" name="nickname")
      button.clear.save-btn(form-type="submit") 确定
</template>
<script setup>
import {reactive, onMounted} from 'vue'
//import {home} from '/common/config/url.json'
import {__post, __postImage} from '/common/script/req.promise'
import {useCache} from '/common/script/cache'
//import {_tip, _go} from '/common/script/tip'
//import {onLoad} from '@dcloudio/uni-app'

// 修改|获取头像和昵称的网址
const uri = {
  update: 'user/setUserInfo',
  get: 'user/getUserInfo',
  // upload: 'Upload/addimage',
}
// 缓存中的用户信息
const User = useCache()

const props = defineProps({
  avatar: {type: String, default: ''},
  nickname: {type: String, default: ''},
  keys: {type: Object, default(){
    //id: 直接查询用户信息的, avatar: '数据库中头像字段', nickname: '数据库中昵称字段'
    return {avatarKey: '', nicknameKey: ''}
  }},
  refreshCache: {type: Boolean, default: false}
})

const data = reactive({
  avatar: '',
  nickname: '',
  popup: {show: false}
})
const pureData = {
  keys: {avatarKey: 'avatarurl', nicknameKey: 'nickname'},
  avatar: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/+EAWEV4aWYAAE1NACoAAAAIAAIBEgADAAAAAQABAACHaQAEAAAAAQAAACYAAAAAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAASygAwAEAAAAAQAAASwAAAAA/9sAQwAHBQUGBQQHBgYGCAcHCAsSCwsKCgsWDxANEhoWGxoZFhkYHCAoIhweJh4YGSMwJCYqKy0uLRsiMjUxLDUoLC0s/8AACwgAhACEAQERAP/EABoAAQEBAQEBAQAAAAAAAAAAAAAEAwEFAgf/xAAkEAEAAgIBBAEFAQAAAAAAAAAAAQIDEQQhM0FxEhMiMVFhgf/aAAgBAQAAPwD9vtabWm1p3M+HAAAAAV8XJeuGYi062kCIAACIAIgU8btz7TAAAAAKeN259pgAfVMdsk6rG4htHEtrraJctxbxHSYlhMTWdTGoAAU8btz7TABEbmIjy9ClIx0isPoY8nHFsfy81RgAp43bn2mAGmCN56rgctG6zH9ecACnjdufaYAaYLfHNWZXA5efjSZnxDzgAU8btz7TAAuw5PqY9+Y/LQTcrL0+nH+pgAU8btz7TAA0wWmuWIjz0XOWn40mf1DzpmbTMzO5kABTxu3PpMAO1pa86rGlWHj/AE5+Vp3ZuJcvGmOtOsfpPManU9AAU8btz7TAREzOo6qMfFmet+n8U1rWsarGodAfF8VckfdH+pcnHtjjcfdX9sgFPG7c+0wK+NjitIv5luAAI+TjilotHTbEFPG7c+0wLePeJw1jfWPw10bNmzZs2bS8q0TNYidzCcFPG7c+0wAAAACnjdufaYAAAABTxu3PtMAAAAAp43bn2xzUjHnvSPxE9XwAAAAD0+DgpbjRad7mX//Z',
  nickname: '点击设置昵称',
}

const methods = {
  _avatar(e){
    const {avatarUrl} = e.detail
    __postImage(avatarUrl).then(res=>{
      const avatar = res
      const post = {[pureData.keys.avatarKey]: avatar}
      __post(uri.update, post).then(res=>{
        User.data = post
        data.avatar = avatar
      })
    })
  },
  _nickname(e){
    const {nickname} = e.detail.value
    if(nickname && nickname != pureData.nickname){
      data.popup.show = false
      const post = {[pureData.keys.nicknameKey]: nickname}
      __post(uri.update, post).then(res=>{
        User.data = post
        data.nickname = nickname
      })
    }
  }
}

onMounted(()=>{
  const {keys, refreshCache, avatar, nickname} = props 
  for (const [k, v] of Object.entries(keys)) {
    if(v) pureData.keys[k] = v
  }
  const {avatarKey, nicknameKey} = pureData.keys
  if(refreshCache){
    __get(uri.get).then(res=>{
      const u = res.userinfo || res
      data.avatar = u[avatarKey]
      data.nickname = u[nicknameKey]
    })
  }
  data.avatar = avatar || User.data[avatarKey] || pureData.avatar
  data.nickname = nickname || User.data[nicknameKey] || pureData.nickname
})
</script>
<style lang="scss" scoped>
@import '/common/scss/mixin.scss';
.user-bar{
  --pop-up-bgcolor: #fff;
  padding: var(--user-bar-padding, 0 0 25rpx 0);
  .avatar{
    margin: 0 var(--avatar-margin-right, 25rpx) 0 0;
    --aimg-width: var(--avatar-width, 110rpx);
    --aimg-border-radius: 50%;
    --btn-width: var(--aimg-width);
  }
  .nickname{
    font-weight: var(--nickname-font-weight, 500);
    font-size: var(--nickname-font-size, var(--font-size, 14px));
    color: var(--nickname-color, var(--font-color-primary, #333));
    padding: var(--nickname-padding, 0 0);
    width: auto;
  }
  .form{
    .input{
      border-bottom: 1px solid #ddd;
      padding: 20rpx 25rpx; margin-bottom: 25rpx;
    }
    .save-btn{
      padding: 25rpx;
    }
  }
}
</style>