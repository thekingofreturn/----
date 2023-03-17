<template lang="pug">
view.rel
  swiper.aslide(@change="_event.change"
  :indicator-dots="swiper.indicatorDots"
  :indicator-color="swiper.indicatorColor"
  :indicator-active-color="swiper.indicatorActiveColor"
  :autoplay="swiper.autoplay"
  :interval="swiper.interval"
  :duration="swiper.duration"
  :circular="swiper.circular")
    template(v-if="params.video")
      swiper-item
        video.video(
        :src="params.video" 
        :show-fullscreen-btn="false"
        :show-play-btn="false"
        :enable-play-gesture="true"
        :poster="params.video_poster"
        object-fit="cover"
        @error="_event.videoError")
    swiper-item(v-for="url,i in urls" :key="i" @click="_event._click(i)")
      aimg.block.slide-item(:src="url")
  view.abs.page.flex.center.small {{data.current}}/{{data.len}}
</template>
<script setup>
import {computed, reactive, watchEffect} from 'vue'
import {_go} from '/common/script/tip'
const props = defineProps({
  items: {type: Array, default: []}, // 如果需要点击跳转则需要设置url字段，如[{img: 'x.jpg', url: '/page/a/b'}]
  src: {type: String, default:''},
  params: {
    type: Object,
    default: {}
  },
  onSlideChange: Function,
  numPage: {type: Boolean, default: false}, // 显示页码
})

const data = reactive({// 页面非渲染数据
  init: false, // 是否初始化
  len: 0, // swiper的页数
  tabBarPages: [], // 如果有跳转，tabBar中的page列表
  current: 1,
})

const swiper = computed(()=>{
  return {...{
    indicatorDots: false,
    indicatorColor: 'rgba(0, 0, 0, .3)',
    indicatorActiveColor: '#00B660',
    autoplay: true,
    interval: 5000, // 间隔时长
    duration: 500, // 切换时长
    circular: true
  }, ...props.params}
})

const urls = computed(()=>{
  let {items, src} = props
  return src.length? items.map((it)=>it[src]): items
})

const emit = defineEmits('slideChange')
const _event = {
  change(e){
    let {current, source} = e.detail
    data.current = current+1
    emit('slideChange', {current: current, source, length: data.len})
  },
  videoError(err){
    console.log(err.detail)
  },
  _click(i){
    const {url} = props.items[i]
    if(url){
      if(!data.tabBarPages.length){
        data.tabBarPages = __wxConfig.tabBar.list.map(p=>p.pagePath.slice(0, p.pagePath.indexOf('.')))
      }
      let type = (data.tabBarPages.findIndex(p=>url.indexOf(p) > -1) > -1) ? 3: 0
      _go(url, type)
    }
  }
}

watchEffect(()=>{
  if(props.items.length && !data.init){
    data.init = true
    let flag = props.params?.video?.length > 0
    data.len = props.items.length + (flag? 1: 0)
    _event.change({detail: {current: 0, source: 'oninit'}})
  }
})
</script>
<style lang="scss" scoped>
.aslide{
  z-index: 1;
  &, .slide-item, .slide-item .block, .video{
    --w: var(--slide-item-width, 750rpx);
    --h: var(--slide-item-height, 300rpx);
    --aimg-width: var(--w);
    --aimg-height: var(--h);
    width: var(--w);
    height: var(--h);
  }
}
.page{
  z-index: 2;
  right: var(--slide-page-right, 25rpx);
  bottom: var(--slide-page-bottom, 25rpx);
  width: var(--slide-page-width, 80rpx);
  height: var(--slide-page-height, 40rpx);
  border-radius: var(--slide-page-border-radius, var(--slide-page-height, 50rpx));
  background-color: var(--slide-page-bgcolor, rgba(100,100,100,.3));
  color: var(--slide-page-color, #fff);
}
</style>
