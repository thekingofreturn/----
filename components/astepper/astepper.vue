<template lang="pug">//- 步进器
view.stepper-box.flex.jssc
  template(v-if="number")
    view.reduce.n.be.rel(@click="methods._num(-1)" :class="{disabled: props.min == number}")
    view.num.center {{number}}
  view.plus.n.be.af.rel( @click="methods._num(1)")
</template>
<script setup>
import {reactive} from 'vue'
//import {home} from '/common/config/url.json'
//import {__get} from '/common/script/req.promise'
const emits = defineEmits(['update:number'])
const props = defineProps({
  // 基本
  min: {type: [Number, String], default: 1},
  max: {type: [Number, String], default: -1},
  number: Number,
  
  // 用来区分在商品列表，哪一个商品更改数量
  change: Function,
  indexs: Array,// 当前商品的索引，可能是某分类下的某商品
})
const pureData = {
  interval: 300, // 两次点击间隔，避免服务器数据处理不同步
  disabled: false, // 间隔保护开关
}
const methods = {
  _num(i){
    if(!pureData.disabled){
      const {number, min, max, indexs} = props
      let num = (number/1 || 0) + i
      if(num < min) num = min
      if(max > 0 && num > max) num = max
      emits('update:number', num)
      if(props.change) props.change({num, indexs})
      pureData.disabled = true
      setTimeout(()=>{
        pureData.disabled = false
      }, pureData.interval)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/mixin.scss';
.stepper-box{
  .n{
    @include bg(var(--stepper-btn-color,#ff0000));
    border:1px solid var(--stepper-btn-color,#ff0000);
    --width: var(--stepper-btn-width, 40rpx);
    width: var(--width);
    height: var(--width);
    border-radius: var(--stepper-radius, 50%);
    &:after,&:before{
      position:absolute;
      height: 4rpx;
      width: calc(var(--width) * 0.6);
      @include bg(var(--stepper-btn-icon-color, #fff));
      top: calc(50% - 2rpx);
      left: calc(var(--width) * 0.2);
    }
    &:after{
      transform: rotate(90deg);
    }
    &.disabled{
      --stepper-btn-color: var(--stepper-btn-disabled-color, #ccc);
    }
  }
  .num{
    width: var(--stepper-num-width, 50rpx);
  }
}

.jssc{
  .n{
    --stepper-btn-color: var(--yellow);
    --stepper-radius: 10rpx;
    border:1px solid var(--stepper-btn-color);
    &.reduce{
      --stepper-btn-color: #fff;
      --stepper-btn-icon-color: #bbbb;
      border-color: #ccc;
    }
  }
}
</style>