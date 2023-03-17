<template lang="pug">
view.load-spin
  view.span(v-for="n in 10" :key="n")
</template>

<script setup>
import { defineComponent } from 'vue';
</script>

<style scoped lang="scss">
.load-spin{
  $w: var(--spin-span-width, 2px);
  $h: var(--spin-span-height, 8px);
  $n: 10;
  position: relative;
  width: calc(#{$h} * 3.65 );
  height: calc(#{$h} * 3.65 );
  transform: translateX(50%);
  .span{
    width: $w;
    height: $h;
    background-color: var(--spin-span-color, #aaa);
    transform-origin: 50% 165%;
    position: absolute;
    animation: load ($n - 1) * 0.1s ease infinite;
    @for $i from 0 to $n {
      &:nth-child(#{$i+1}){
        transform: rotate($i * 40deg);
        animation-delay: $i * .1s;
      }
    }
  }
}

@keyframes load{
  from{opacity: 1}
  to{opacity: 0.2}
}
</style>