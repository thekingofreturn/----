<template lang="pug">
//- 大转盘抽奖
  pug:
  lottery(ref="Lottery" :luck="data.lottery.luck" :over="methods._over")
    template(v-slot="{index}")
      view {{ index }}a
    template(#arrow)
      view 抽奖
  js:
    data.lottery.luck = 4
    nextTick(Lottery.value.lottery)
view.rel(:style="`--grid-side: ${data.side}rpx; --circle-radius: ${radius}rpx; --columns: ${columns};`")
  view.wheel.rel.flex.center.af(:animation="data.animation")
    view.grid.abs.flex.center(v-for="n,i in columns" :style="`transform: rotateZ(${360 / columns * i}deg)`")
      slot(:index="i")
  view.pointer.flex.center.txt.white.abs
    slot(name="arrow")
</template>
<script setup>
import {reactive, watchEffect} from 'vue'
import {_tip} from '/common/script/tip'

const props = defineProps({
  columns: {type: Number, default: 10}, // 几个奖项
  radius: {type: Number, default: 350}, // 圆盘半径，单位rpx
  duration: {type: Number, default: 2000}, // 圆盘旋转持续时间
  scroll: {type: Number, default: 2}, // 抽奖时滚动几圈
  luck: {type: Number, default: 0}, // 中奖的格子下标索引
  over: Function, // 抽奖完成时执行
})

const data = reactive({
  animation: {},
  side: 0, // 转盘外切多边形的单边长
})

const pureData = {
  animaite: {},
  per: 360 / props.columns, // 平均每个角的度数
  deg: 0, // 已经旋转了多少度
  isReady: 1, // 转盘是否准备好
  isOver: 0, // 是否已经结束
  scrollDeg: 0, // 抽奖时滚动几圈换成度数
}

// 为基本参数赋值
const stopWatch = watchEffect(()=>{
  const {radius, columns, scroll, duration} = props
  // 计算转盘外切多边形的单边长
  data.side = 2 * radius * Math.tan( 360 / columns / 2 * Math.PI / 180)
  pureData.animaite = uni.createAnimation({timingFunction: 'ease-in-out', duration})
  pureData.scrollDeg = 360 * scroll
})
stopWatch()

const methods = {
  luckGiftDeg(){// 奖品应该所在的度数
    let {deg, per, scrollDeg} = pureData
    if(deg) deg = scrollDeg - deg % scrollDeg // 把转盘归零所需度数
    return props.luck * per - deg 
  },
  lottery(){
    if(pureData.isReady){
      pureData.isReady = 0
      pureData.deg += pureData.scrollDeg - methods.luckGiftDeg()
      console.log(pureData.deg)
      pureData.animaite.rotateZ(pureData.deg).step()
      data.animation = pureData.animaite.export()
      setTimeout(methods.over, data.duration + 10)
    }
  },
  over(){
    pureData.isReady = 1
    if(props.over) props.over()
  }
}

defineExpose({
  lottery: methods.lottery
})
</script>

<style lang="scss" scoped>
@import '/common/scss/mixin.scss';
// @use "sass:math";
.wheel{
  @include bg(rgba(0,0,0,.1));
  width: calc(var(--circle-radius) * 2);
  height: calc(var(--circle-radius) * 2);
  border-radius: 50%;
  margin: var(--wheel-margin-top, 0) auto var(--wheel-margin-bottom, 0) auto;
  overflow: hidden;
  &::after{
    position: absolute; left: 0; top: 0; z-index: 2;
    width: 100%; height: 100%; box-sizing: border-box;
    border: 25rpx solid red;
    border-radius: 50%;
  }
  .grid{
    z-index: 1;
    height: var(--circle-radius);
    width: var(--grid-side);
    transform-origin: bottom center;
    clip-path: polygon(0 0, 100% 0, 50% 100%);
    @for $i from 1 to 10{
      &:nth-child(#{$i}){
        @include bg(rgba(random(255),random(255),random(255), 1) );
      }
    }
    left: calc(50% - var(--grid-side) / 2); top: 0;
  }
}
.pointer{
    z-index: 3;
    @include avatar(80, 50%);
    @include bg(red);
    left: calc(50% - 40rpx);
    top: calc(50% - 40rpx);
  }
</style>
