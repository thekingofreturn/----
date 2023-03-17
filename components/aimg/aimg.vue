<template lang="pug">
image.aimg.class(:src="url" :mode="mode" lazy-load="true" @load="finish" :class="{load: !ready}")
</template>
<script setup>
import {host, imgRootDir} from '@/common/config/app.json'
import {computed, ref} from 'vue'
const props = defineProps({
  src: {type: [String, Number], default: ''},
  mode: {type: String, default: 'aspectFill'},
  // 缩写支持
  local: {type: Boolean, default: false},
  png: {type: Boolean, default: false},
  jpg: {type: Boolean, default: false},
  svg: {type: Boolean, default: false}
})
const ready = ref(false)
const finish = ()=>{ ready.value = true }
const url = computed(()=>{
  let {src, local} = props
  if(local){
    src = (imgRootDir + src).replaceAll('//', '/')
  }else{
    ['png', 'jpg', 'svg'].forEach((mime)=>{ 
      if(props[mime]) src = `${imgRootDir}/${mime}/${src}.${mime}`.replaceAll('//', '/')
    }) 
  }
  let flag = src.indexOf('http') == -1 &&  src.indexOf(host) == -1 &&  src.indexOf('data:image') == -1
  // #ifdef H5
  flag = flag && process.env.NODE_ENV != 'production'
  // #endif
  return (flag && src.indexOf(imgRootDir) == -1)? (host+src).replace(/\/\//g, '/').replace(/:\/([^\/])/, '://$1'): src
})
</script>
<script>
export default {// 微信小程序组件默认设置
  options: {
    styleIsolation: 'apply-shared',
    virtualHost: true
  },
  externalClasses: ['class'],
}
</script>
<style lang="scss" scope>
.aimg{
  display: var(--aimg-display, block);
  width: var(--aimg-width, 32rpx); 
  height: var(--aimg-height, var(--aimg-width, 32rpx)); 
  border-radius: var(--aimg-border-radius, inherit);
  &.load{
    background-color: var(--aimg-load-bgcolor, transparent);
    &:after{
      position: absolute;
      width: 300rpx; text-align:center;
      content: "";/* 图片载入中... */
      left: calc(50% - 150rpx);
      top: calc(50% - 18rpx);
      color: var(--aimg-load-bgcolor, #555);
      font-size: 12px;
    }
  }
}
</style>