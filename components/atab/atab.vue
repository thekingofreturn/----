<template lang="pug">
//-
  示例开始：
  atab(:tabs="datas.tabs" v-model:active="props.active" :click="_event.tab" :reach-bottom="getList")
    template(#content="{index}")
      view(v-for="n,ii in Array(50)") {{t.title}}{{ii}}
  示例结束

  2022-12-13

view.tab-box.rel.class(:style="`--tab-offset-top:${datas.tabOffsetTop}px`")
  scroll-view.tab-tit-box.af.clear.sticky(
   scroll-x scroll-with-animation
   show-scrollbar="false" enhanced
   :style="tabs.length<=4?`--tab-tit-width:${(100/tabs.length).toFixed(2)}%`:''"
   :scroll-into-view="datas.scrollTo")
    view.underline.abs(:style="`--left:${datas.scrollLeft}px`")
    view.tab-tit.rel.center.bsbb(
     @click="_event.tap"
     :data-i="i"
     v-for="t,i in tabs" :key="i" 
     :class="{'active af': i == props.active}"
     :id="datas.getId(i)"
     ref="tabTit"): view.rel {{t}}
  view.tab-content.rel(v-if="hasContentBox")
    slot(name="before-content")
    view.content-box.af.clear.rel(
     :style="`width: ${750*tabs.length}rpx; left: ${props.active*-750}rpx;`")
      scroll-view.a-content(v-for="t,index in tabs" :key="index"
       scroll-y show-scrollbar="false" enhanced
       @scrolltolower="_event.loadmore"
       @touchstart="_event.touch.start" 
       @touchend="_event.touch.end")
        slot(name="content" :index="index")
</template>
<script setup>
import {ref, reactive, onMounted, watch, getCurrentInstance} from 'vue'
const emits = defineEmits(['update:active'])
const props = defineProps({
  tabs: {type: Array, default(){ return ['选项1','选项2'] }},
  active: {type: Number, default: 0},// 当前tab索引所在
  touch: {type: Boolean, default: true}, // 是否启用滑动切换tab
  hasContentBox: {type: Boolean, default: true}, // 是否包含tab对应内容box
  click: Function, // 点击tab
  reachBottom: Function, // 某tab内容到达底部
  ready: Function, // 初始化完成后调用
  underlineWidth: {type: String, default: '60px'}, // active下划线宽度，单位仅支持px
})

const salt = Date.now()
const datas = reactive({
  scrollTo: '',
  tabOffsetTop: 0,
  scrollLeft: 0,
  getId: (i)=>{
    return `tab-tit-${salt}-${i}`
  },
  isReady: false, // 初始化完成  
})

let touch = {
  x: 0, y: 0, distance: 95,// 移动的像素值
}

const _event = {
  async tap(e, isReady=false){
    let {dataset:{i}, id = 0} = e.currentTarget
    id ||= datas.getId(i)
    try{
      let {width = 0, offsetLeft = 0} = tabBounds[id]
      datas.scrollLeft = offsetLeft + width / 2 - props.underlineWidth.replace('px', '') / 2
      if(isReady || (i != props.active)){
        emits('update:active', i)
        datas.scrollTo = datas.getId(i<3?0:i-1)
        props.click && props.click(i)
      }
    }catch(e){ console.log(e) }
  },
  loadmore(){
    props.reachBottom && props.reachBottom(props.active)
  },
  touch: {
    start(e){
      if(props.touch){
        ({pageX:touch.x, pageY:touch.y} = e.changedTouches[0])
      }
    },
    end(e){
      if(props.touch){
        let {pageX, pageY} = e.changedTouches[0]
        let x = pageX - touch.x 
        if( Math.abs(x) > touch.distance){
          let i = -1
          if(x>0){
            if(props.active > 0){
              i = props.active-1
            }
          }else{
            if(props.active < props.tabs.length - 1){
              i = props.active+1
            }
          }
          i < 0 || _event.tap({currentTarget: {dataset:{i}}})
        }
      }
    }
  }
}

let tabBounds = {}// 存放tab项相关width等
const { ctx } = getCurrentInstance() // 这就是this
const getBoundRect = (el)=>{
  return new Promise((resolve)=>{
  // #ifdef MP-WEIXIN
    const query = uni.createSelectorQuery().in(ctx) 
    query.select(el).boundingClientRect(data => {
      let {width, left: offsetLeft, top} = data
      resolve({width, offsetLeft, top})
    }).exec()
  // #endif
  // #ifdef H5
    const {offsetLeft, offsetLeft:top, offsetWidth:width} = document.querySelector(el)
    resolve({width, offsetLeft, top})
  // #endif

  // #ifdef APP-PLUS
  resolve({width: 0, offsetLeft: 0, top: 0})
  // #endif
  })
  
}
const tabReady = async()=>{
  if(!datas.isReady){
    for(let i = 0; i< props.tabs.length; i++){
      let id = datas.getId(i)
      tabBounds[id]  = await getBoundRect(`#${id}`)
    }
  }
  return new Promise((resolve)=>{
    if(!datas.isReady){
      let vals = Object.values(tabBounds)
      vals[0].offsetLeft = 0
      vals.unshift({width: 0, offsetLeft: 0})

      Object.keys(tabBounds).forEach((k,i)=>{
        tabBounds[k].offsetLeft = vals.filter((t,ii)=>ii<=i).reduce((p,c)=>{
          return {offsetLeft: p.offsetLeft + c.width, width: c.width}
        }).offsetLeft
      })
      
      getBoundRect('.tab-box').then(res=>{
        datas.tabOffsetTop = res.top
      })

      datas.isReady = true
      props.ready && props.ready()
    }
    resolve()
  })
}

watch(()=>props.active, (i)=>{
  if(props.active != i){
    if(datas.isReady){
      _event.tap({currentTarget:{dataset: {i}}}, true)
    }else{
      props.active = i
    }
  }
})
onMounted(()=>{
  if(props.tabs.length){
    tabReady().then(()=>{
      _event.tap({currentTarget: {dataset:{i: props.active}}}, true)
    })
  }
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
@import '/common/scss/mixin.scss';
.tab-box{
  --tabHeight: var(--tab-height, 46px);
  .tab-tit-box{
    white-space: nowrap;
    ::-webkit-scrollbar{
      display: none;
    }
    @include bg(var(--tab-box-bgcolor, #fff));
    border-bottom: 1px solid var(--tab-box-color, #ddd);
    top: var(--pageOtherModHeight, 0);
  }
  .underline{
    // #ifndef APP-PLUS 
    width: var(--underline-width, v-bind('underlineWidth'));
    background-color: var(--tab-active-color,#ff0000);
    height: var(--underline-height, 2px);
    top: calc(var(--tabHeight) - var(--underline-height, 2px));
    left: var(--tab-active-left, var(--left, 0));
    transition: all .3s;
    // #endif
  }
  .tab-tit{
    display: inline-block;
    height: var(--tabHeight);
    width: var(--tab-tit-width, auto);
    line-height: var(--tabHeight);
    padding: 0 25rpx;
    // #ifdef APP-PLUS
    &.active::after{
      position: absolute; bottom: 20rpx; z-index: 1;
      @include bg(var(--tab-active-color,#ff0000));
      --app-active-width: var(--underline-width, v-bind('underlineWidth'));
      width: var(--app-active-width);
      height: var(--underline-height, 2px);
      left: calc(50% - var(--app-active-width) / 2);
    }
    // #endif
  }
  .tab-content{
    top: 0;//var(--tabHeight);
    width: 750rpx;
    overflow: hidden;
    .content-box{
      top: 0;
      transition: all 0.2s;
      .a-content{
        width: 750rpx;
        height: calc(100vh - var(--tabHeight)); // 修改高度直接!important;
        float: left;
      }
    }
  }
}
</style>