<template lang="pug">
//- 
  竖向右侧商品滚动影响左侧分类的tab容器
  异步获取商品，当所有的分类和商品对应并获取完成后，赋予data.goods.ready=true，此时再渲染vtab否则计算有误差
  示例开始：
  avtab(:cates="data.cates" v-if="data.goods.ready")
    template(#left-body="{index, active}")
      <view>左边分类</view>
    template(#right="{index}")
      <view>右边商品</view>

  示例结束

  2022-12-20

view.vtab.rel.af.clear.bsbb.class(:style="data.top?`--vtab-top: ${data.top}px`:''")
  scroll-view.left-box.bsbb(
   :scroll-top="data.scrollTop.left"
   scroll-y scroll-with-animation
   enhanced :show-scrollbar="false"
   enable-passive)
    slot(name="left-top")
    view.mod-box.flex.center(
     :class="{active: data.active == i}"
     @click="methods._active(i)"
     v-for="n,i in cates" :key="i")
      slot(name="left-body" :index="i")
  scroll-view.bsbb.right-box(
   @dragging="methods._dragging"
   @scrolltolower="methods._bottom"
   @scrolltoupper="methods._top"
   :scroll-top="data.scrollTop.right"
   scroll-y enhanced	:show-scrollbar="false"
   scroll-with-animation
   enable-passive)
    view.mod-box(
     :id="pureData.rulePrefix+i" 
     v-for="n,i in cates" :key="i")
      slot(name="right" :index="i")
</template>
<script setup>
import {reactive} from 'vue'
import {onMounted, getCurrentInstance, watch} from 'vue'
const props = defineProps({
  cates: Array,
})
const data = reactive({
  top: 0,
  active: 0,
  scrollTop: {left: 0, right: 0}
})
const pureData = {// 非响应数据
  rightTops: [],
  cateHeight: 0,
  rulePrefix: 'goods-list-id-'
}

const methods = {
  _active(i){
    data.active = i
    if(pureData.rightTops.length > 0){
      data.scrollTop.right = pureData.rightTops[i] - data.top
    }
  },
  _dragging(e){
    const top = data.top + Math.floor(e.detail.scrollTop)
    pureData.rightTops.forEach((n,i)=>{
      if(top >= n && data.active != i){
        data.active = i
        if(i > 1){
          data.scrollTop.left = (i - 1) / props.cates.length * pureData.cateHeight
        }
        return
      }
    })
  },
  _top(){
    data.active = 0
    data.scrollTop.left = 0
  },
  _bottom(){
    data.active = props.cates.length - 1
  }
}

const instance = getCurrentInstance()
const query = uni.createSelectorQuery().in(instance)
const getBound = (el)=>{
  return new Promise((resolve, reject)=>{
    try{
      // #ifndef H5
      query.select(el).boundingClientRect((rect)=>{
        resolve(rect)
      }).exec()
      // #endif
      // #ifdef H5
      // const {offsetTop: top, offsetHeight:height} = document.querySelector(el)
      // resolve({top, height})
      // #endif
    }catch(err){
      reject(err)
    }
  })
}
onMounted(async()=>{
  data.top = (await getBound('.vtab')).top
  pureData.cateHeight = (await getBound('.left-box')).height

  props.cates.forEach(async(n,i)=>{
    const bound = await getBound('#'+pureData.rulePrefix+i)
    if(bound) pureData.rightTops[i] = bound.top
  })
})
</script>
<script>
export default {
  options: {
    styleIsolation: 'apply-shared',
    virtualHost: true
  },
  externalClasses: ['class'],
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/mixin.scss';
%box{
  float: left;
  height: calc(100vh - var(--vtab-top, 0rpx) - var(--vtab-etc-height, 0rpx));
  padding-bottom: var(--vtab-padding-bottom, 0);
}
.vtab{
  --box-width: var(--vtab-width, 750rpx);
  --left: var(--left-width, 220rpx);
  --gap: var(--margin-gap, 25rpx);
  width: var(--box-width);
  .left-box{
    @extend %box;
    width: var(--left);
    background-color: var(--left-bgcolor, transparent);
  }
  .right-box{
    @extend %box;
    width: calc(var(--box-width) - var(--left) - var(--gap));
    margin-left: var(--gap);
  }
}
</style>