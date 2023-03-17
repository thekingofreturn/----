<template lang="pug">
view.a-skeleton.class.rel
  view(v-if="data.loading" :class="{fadeout: data.fadeout}")
    view.a-skeleton-box.bsbb.sk-animate
      template(v-for="sk,i in ske.rows" :key="i")
        template(v-if="sk.avatar && sk.title && sk.row")
          view.flex.start.sk-a-r(:class="`row-${i}`")
            view.ske.ske-avatar
            view.grow
              view.ske.ske-title(v-for="n in sk.title" :key="n")
              view.ske.ske-row(v-for="n in sk.row" :key="n")
        template(v-else-if="sk.avatar && sk.row")
          template(v-if="sk.row>1")
            view.flex.start.sk-a-r(:class="`row-${i}`")
              view.ske.ske-avatar
              view.grow
                view.ske.ske-row(v-for="n in sk.row" :key="n")
          template(v-else)
            view.flex.sk-ico(:class="`row-${i}`")
              view.grow(v-for="n in sk.avatar" :key="n")
                view.ske.ske-avatar
                view.ske.ske-row.m-auto
        template(v-else-if="sk.title && sk.row")
          view.ske-t-r(:class="`row-${i}`")
            view.ske.ske-title(v-for="n in sk.title" :key="n")
            view.ske.ske-row(v-for="n in sk.row" :key="n")
        template(v-else-if="sk.avatar")
          view.flex.sk-ico(:class="`row-${i}`" v-if="sk.avatar>1")
            view.grow(v-for="n in sk.avatar" :key="n")
              view.ske.ske-avatar
          view.ske.ske-avatar.full(v-else)
        template(v-else-if="sk.row")
          view.ske.ske-row(v-for="n in sk.row" :key="n" :class="`row-${i}`")
  view.rel(v-if="!data.loading" :class="{active: !data.loading}")
    slot
</template>
<script setup>// 骨架屏
import {computed, watch, reactive} from 'vue'
const props = defineProps({
  rows: {type: [Array, Object], default: ()=>{
    return [
        {row: 3, avatar: 1, title: 1},
        {avatar: 4},
        {row: 4, title: 2},
        {avatar: 1},
        {row: 5, avatar: 1},
        {row: 1, avatar: 4},
      ]
    }
  },
  loading: {type: Boolean, default: true}
})
const ske = computed(()=>{
  let {rows} = props
  return {
    rows: Array.isArray(rows)?rows:[rows]
  }
})
const data = reactive({
  fadeout: false,
  loading: true,
})
watch(()=>props.loading, (loadSke)=>{
  if(!loadSke){// 数据载入完成，关闭骨架屏
    data.fadeout = true
    setTimeout(()=>{
      data.loading = false
    }, 300)
  }
}, {immediate: true})
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
%full{
  position: fixed;
  left: 0; top: 0;
  height: 100vh; width: 100vw;
}
.a-skeleton{
  .a-skeleton-box{
    @extend %full;
    z-index: 99;
    padding: 0 var(--ske-padding-lr, 25rpx);
  }
  .ske{
    @include bg(var(--ske-bgcolor, rgba(100,100,100,.1)));
  }
  .ske-avatar{
    width: var(--ske-avatar-width, 145rpx);
    height: var(--ske-avatar-height, var(--ske-avatar-width, 145rpx));
    margin-right: var(--ske-avatar-m-right, 25rpx);
    border-radius: var(--ske-avatar-radius, 0);
    &.full{
      width: var(--ske-avatar-width, 100%);
      margin-bottom: var(--ske-avatar-m-bottom, 25rpx);
      --sk-ico-g-p: 0;
    }
  }
  .ske-title{
    width: var(--ske-title-width, 80%);
    height: var(--ske-title-height, var(--ske-row-height, 40rpx));
    margin-bottom: var(--ske-title-m-bottom, var(--ske-row-m-bottom, 25rpx));
  }
  .ske-row{
    width: var(--ske-row-width, 100%);
    height: var(--ske-row-height, 40rpx);
    margin-bottom: var(--ske-row-m-bottom, 15rpx);
  }
  .sk-a-r, .ske-t-r, .sk-ico{
    margin-bottom: var(--ske-a-r-m-bottom, var(--ske-row-m-bottom, 25rpx));
  }
  .sk-ico{
    justify-content: space-evenly;
    .ske-avatar{
      --ske-avatar-m-right: auto;
      margin-left: auto;
    }
    .grow{
      padding:0 var(--sk-ico-g-p, var(--ske-row-m-bottom, 10rpx));
    }
    .ske-row{
      --ske-row-width: var(--ske-avatar-width, 145rpx);
      margin-top: var(--sk-ico-row-m-top, var(--ske-row-m-bottom, 15rpx));
    }
  }
  .active{
    animation:con-show 0.3s linear;
  }
  .fadeout{
    animation:con-show 0.3s linear alternate-reverse;
  }
}
.sk-animate{
  animation:ske-blink 1.2s ease-in-out infinite;
}
@keyframes ske-blink{50%{opacity:.6}}
@keyframes con-show{from{opacity: 0;} to{opacity: 1;}}
</style>