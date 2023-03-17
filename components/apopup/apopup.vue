<template lang="pug">
view.a-pop-up.fixed.full(:class="position=='center'?'flex center':position" v-if="show" @click="_close" @touchmove.stop)
  view.pop-up.bsbb.rel(@click.stop)
    view.close.mod.abs(@click.stop="_close" v-if="closeIcon"): aimg(:src="icon")
    slot
</template>
<script setup>
const props = defineProps({
  mask: {type: Boolean, default: true},// 遮罩
  closeIcon: {type: Boolean, default: false},// 关闭图标
  position: {type: String, default: 'center'}, // top,left,right,center,botoom
  show: {type: Boolean, default: true},  
})
const emits = defineEmits(['update:show'])
const _close = ()=>{
  emits('update:show', false)
}
const icon = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTU2OS41Nzg4MzEgNTEybDM3OC4yMTM4OTItMzc4LjIxMzg5MmMxNS44MDU5NTQtMTUuODA1OTU0IDE1LjgwNTk1NC00MS43NzI4NzggMC01Ny41Nzg4MzFzLTQxLjc3Mjg3OC0xNS44MDU5NTQtNTcuNTc4ODMxIDBsLTM3OC4yMTM4OTIgMzc4LjIxMzg5Mi0zNzguMjEzODkyLTM3OC4yMTM4OTJjLTE1LjgwNTk1NC0xNS44MDU5NTQtNDEuNzcyODc4LTE1LjgwNTk1NC01Ny41Nzg4MzEgMGwwIDBjLTE1LjgwNTk1NCAxNS44MDU5NTQtMTUuODA1OTU0IDQxLjc3Mjg3OCAwIDU3LjU3ODgzMWwzNzguMjEzODkyIDM3OC4yMTM4OTItMzc4LjIxMzg5MiAzNzguMjEzODkyYy0xNS44MDU5NTQgMTUuODA1OTU0LTE1LjgwNTk1NCA0MS43NzI4NzggMCA1Ny41Nzg4MzFsMCAwYzE1LjgwNTk1NCAxNS44MDU5NTQgNDEuNzcyODc4IDE1LjgwNTk1NCA1Ny41Nzg4MzEgMGwzNzguMjEzODkyLTM3OC4yMTM4OTIgMzc4LjIxMzg5MiAzNzguMjEzODkyYzE1LjgwNTk1NCAxNS44MDU5NTQgNDEuNzcyODc4IDE1LjgwNTk1NCA1Ny41Nzg4MzEgMGwwIDBjMTUuODA1OTU0LTE1LjgwNTk1NCAxNS44MDU5NTQtNDEuNzcyODc4IDAtNTcuNTc4ODMxTDU2OS41Nzg4MzEgNTEyeiIgZmlsbD0iIzk5OSI+PC9wYXRoPjwvc3ZnPg=='
</script>
<style scoped lang="scss">
@import "@/common/scss/mixin.scss";
.a-pop-up{
  z-index: 100;
  .pop-up{
    @include bg(var(--pop-up-bgcolor, transparent));
    border-radius: var(--pop-up-border-radius, 0);
    text-align: left;
    margin: var(--pop-up-margin, 0);
    .close{
      right: var(--pop-up-close-right, 0);
      top: var(--pop-up-close-top, 0);
      --aimg-width: var(--pop-up-close-width, 24rpx);
    }
  }
  &.bottom{
    .pop-up{
      position: absolute;
      bottom: 0; left: 0;
      width: var(--pop-up-width, 100%);
    }
  }
  &.right{
    .pop-up{
      position: absolute;
      top: 0; right: 0; height: 100vh;
      width: var(--pop-up-width, 100%);
    }
  }
}
</style>
