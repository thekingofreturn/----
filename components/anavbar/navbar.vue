<template lang="pug">
view.nav-bar-box.e.flex(:class="data.position"
:style="`--top:${data.top}px;--left:${data.left}px;--height:${data.height}px;--color:${color=='black'?'#333':'#fff'}`")
  view.navback.flex(@click="_go")
    view.icon.m-r-25: view.arrow.left.rel
    view.title.flex(:class="{center: align=='center'}" :style="`--width:${data.titleWidth}px;--padding:${data.titlePaddingLeft}px`"): slot

</template>
<script setup>
import {onMounted, reactive} from 'vue'
const props = defineProps({
  barBgColor: {type: String, default: 'transparent'},
  
  color: {type: String, default: 'white'}, // 支持black,white,影响文字和icon
  
  iconBgColor: {type: String, default: '#000000B3'},
  iconSize: {type: String, default: '46rpx'},
  
  type: {type: String, default: 'navigateBack'},
  url: String,// 如果是返回到其他页面
  align: {type: String ,default: 'left'}, //title文字对齐方式
})
const data = reactive({
  top: 63,
  left: 0,
  height: 32,
  position: 'sticky',
  titleWidth: 0, // 如果标题居中，则标题的实际宽度
  titlePaddingLeft: 0,
})
const _go =()=>{
  let url = `/pages/${props.url}`
  switch(props.type){//不支持uni[props.type]()
    case 'navigateBack':
      let pages = getCurrentPages()
      if(pages && pages.length > 1){
        uni.navigateBack({delta: 1})  
      }else{  
        history.back()
      }
    break; case 'navigateTo':
      uni.navigateBack({url})    
    break; case 'redirectTo':
      uni.redirectTo({url})
    break; case 'reLaunch':
      uni.reLaunch({url})
    break; case 'switchTab':
      uni.switchTab({url})
    break;
  }
}
// #ifdef MP-WEIXIN
onMounted(()=>{
  const {height, top, right, width} = uni.getMenuButtonBoundingClientRect()
  const {windowWidth} = uni.getWindowInfo()
  data.height = height
  data.top = top
  data.left = windowWidth - right
  data.titlePaddingLeft = data.left + width
  data.titleWidth = props.align == 'center'? (windowWidth - data.titlePaddingLeft * 2): (windowWidth - data.titlePaddingLeft - data.left)
  data.position = 'fixed'
})
// #endif
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
<style lang="scss" scoped>
@import '@/common/scss/mixin.scss';
.nav-bar-box{
// #ifdef MP-WEIXIN
  --fixed-z-index: 100;
  top: 0; left: 0;
  padding-left: var(--left, 7px);
  height: var(--height, 32px);
  padding-top: var(--top);
  box-sizing: content-box;
// #endif
  background-color: v-bind(barBgColor);
  color: var(--color, #333);
  .icon{
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    @include bg(v-bind(iconBgColor));
    border-radius: 50%;
    .arrow{
      width: v-bind(iconSize);
      height: v-bind(iconSize);
      --w: 14rpx;
      &:before{
        margin-left: calc(v-bind(iconSize) / 2 - var(--w) / 2);
      }
    }
  }
  .title.center{
    width: var(--width);
    margin-left: calc(var(--padding) - v-bind(iconSize) - 25rpx - var(--left));
  }
}
</style>