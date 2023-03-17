<template lang="pug">
view.loading-box.flex.center(v-if="show")
  view.loading-box-ico(v-if="mode=='more'")
    template(v-if="theme == 'spin'")
      spin.spin
  view.loading-box-text.small {{text? text: (mode=='more'? moreText: emptyText)}}
</template>

<script setup>
import spin from './theme/spin/index.vue'
const props = defineProps({
  text: {type: String, default: ''},
  theme: {type: String, default: 'spin'}, // 暂时就一种
  show: {type: Boolean, default: true},
  mode: {type: String, default: 'more'}, // 支持 more:加载更多，empty:没有更多数据，两种文字模式，当text有值时无效
  emptyText: {type: String, default: '—— 没有更多了 ——'},
  moreText: {type: String, default: '数据加载中...'}
})

</script>

<style lang="scss" scoped>
.loading-box{
  padding: var(--loading-box-padding, 15px 0);
  .loading-box-text{
    // margin-left: 10px;
    color: var(--loading-text-color, #aaa);
  }
  .loading-box-ico{
    transform: scale(.65);
  }
}
</style>
