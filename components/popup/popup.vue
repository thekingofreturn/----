<template lang="pug">
apopup.popup(v-model:show="data.show" close-icon v-if="show")
  view.bg.white.popup-content.mod.bsbb.radius
    view.tit.center.bold {{ title }}
    aimg.pic(:src="pic" v-if="pic")
    view.content.small
      slot(name="content")
    view.tips.small.x
      slot(name="tips")
    view.btns.flex.center(v-if="btns.items.length" :class="{'a-btn': btns.items.length == 1}")
      view.btn.round.bold(v-for="n,i in btns.items" :class="`btn-${i}`" @click="methods._btn(i)") {{ n }}
</template>
<script setup>
import {reactive, watch} from 'vue'
const emits = defineEmits(['update:show'])
const props = defineProps({
  show: Boolean,
  title: String,
  pic: String,
  btns: {type: Object, default(){
    return {items: ['取消', '确定'], click(i){ console.log(`按钮${i}被点击`) }}
  }}
})
const data = reactive({
  show: true
})
const methods = {
  _btn(i){
    if(props.btns && props.btns.click){
      props.btns.click(i)
      if(props.btns.items[i] == '取消'){
        data.show = false
      }
    }
  }
}
watch(()=>data.show, (show)=>{
  emits('update:show', show)
})
watch(()=>props.show, (show)=>{
  data.show = show
}, {immediate: true})
</script>
<style scoped lang="scss">
@import "/common/scss/mixin.scss";
.popup{
  --pop-up-margin: -70px 0 0 0;
  --pop-up-close-top: 25rpx;
  --pop-up-close-right: 20rpx;
  .popup-content{
    --mod-padding: 45rpx;
    width: 650rpx;
    .pic{
      --aimg-width: 250rpx;
      margin: 45rpx auto;
    }
    .content{
      line-height: 2;
    }
    .tips{
      margin: 25rpx 0;
      padding: 15rpx;
      border-radius: 15rpx;
      line-height: 1.6;
      @include bg(#FFF2F2, #FF3641);
    }
    .btns{
      margin-top: 45rpx;
      &:not(.a-btn){
        margin-right: -40rpx;
        .btn{
          margin-right: 40rpx;
        }
        .btn:first-child{
          --btn-bgcolor: #F6F6F6;
        }
      }
    }
  }
}
</style>
