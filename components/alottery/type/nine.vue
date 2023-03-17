<template lang="pug">
//- 九宫格抽奖
  pug:
  lottery(v-slot="{index, active}" :width="600" :luck="data.lottery.luck" :over="methods._over" ref="Lottery")
    view {{ index }}
  js:
    data.lottery.luck = 4
    nextTick(Lottery.value.lottery)
view.lottery-grid-box.flex.wrap(:style="`--lottery-grid-box-width: ${width}rpx; --lottery-grid-width: ${width / cols}rpx;`")
  template(v-for="n,i in rows * cols")
    view.grid.flex.center(:class="{active: i == data.randIndex}" )
      slot(:active="i == data.randIndex" :index="i")
</template>
<script setup>
import {reactive} from 'vue'
const props = defineProps({
  rows: {type:Number, default: 3}, // 几行 暂未拓展
  cols: {type:Number, default: 3}, // 几列
  width: {type: Number, default: 690}, // 九宫格容器宽度，单位rpx
  mode: {type: String, default: 'rand'}, // 点击随机格的形式，rand:随机，follow:依次
  luck: Number, // 最终中奖的格子下标索引
  duration: {type: Number, default: 5000}, // 随机持续时长
  interval: {type: Number, default: 100}, // 随机格子产生时长
  over: Function, // 抽奖完成时执行
})
const data = reactive({
  randIndex: -1, // 随机点亮格子
})
const pureData = {
  isReady: 1,
}
const methods = {
  lottery(){// 开始抽奖
    if(pureData.isReady){
      pureData.isReady = 0
      const {duration, interval, rows, cols, luck} = props
      const gridTotal = rows * cols
      const randGridTotalNum = Math.ceil(duration / interval)
      // 点亮格子的顺序数组
      let gridIndexs = Array(randGridTotalNum).fill(0).map(()=> Math.floor(gridTotal * Math.random()) )
      if(props.mode == 'follow' && gridTotal == 9){
        const _gs = [0, 1, 2, 5, 8, 7, 6, 3]
        const _i = _gs.findIndex(n=>n == luck)
        const _ary = Array(Math.ceil(randGridTotalNum / gridTotal)).fill(_gs)
        console.log(_ary)
        _ary.push(_gs.slice(0, _i))
        gridIndexs = _ary.flat()
      }
      gridIndexs.push(luck)

      let _index = 0
      const len = gridIndexs.length
      const siv = setInterval(()=>{
        if(_index >= len){
          clearInterval(siv)
          methods.over()      
        }else{
          data.randIndex = gridIndexs[_index ++]
        }
      }, interval)
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
<style lang="scss">
@import "/common/scss/mixin.scss";
.lottery-grid-box{
  width: var(--lottery-grid-box-width, 690rpx);
  margin: var(--lottery-grid-box-margin, 0 auto);
  .grid{
    @include bg(var(--grid-bgcolor, #eee));
    width: var(--lottery-grid-width, 230rpx);
    height: var(--lottery-grid-height, var(--lottery-grid-width, 230rpx));
    &.active{
      --grid-bgcolor: var(--grid-active-bgcolor, #ffff00);
    }
  }
}
</style>