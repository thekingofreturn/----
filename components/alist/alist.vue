<template lang="pug">
//-
  列表容器
  pug:
  alist(v-slot="{index, item:n}" v-model:dataList="data.list.data" v-model:loading="data.list.loading" ref="DataList")
    view {{ index }}
    view {{ item.text }}
  // 或者
  alist(v-model:dataList="data.list.data" v-model:loading="data.list.loading" ref="DataList")
    template(#default="{index, item: n}")

  js:
  DataList = ref(null)
  nextTick(()=>{
    DataList.value.loadMore(()=>{
      return __get(uri, args).then(res=>{
        // 整理数据
        return res
      })
    })
  })
view.a-list-box
  aempty(v-if="!loading && dataList.length == 0" :text="emptyText" :icon="emtpyIcon" :size="emtpyIconSize")
  view.list-box.m-b-25
    template(v-for="n,i in dataList" :key="forKey || i")
      slot(:index="i" :item="n")
  aloading(:show="loading" :emptyText="noMore" :moreText="loadMore" :mode="data.loadMode")
</template>
<script setup>
import {reactive} from 'vue'
//import {home} from '/common/config/url.json'
//import {__get} from '/common/script/req.promise'
//import {_tip, _go} from '/common/script/tip'
//import {onLoad} from '@dcloudio/uni-app'

const emits = defineEmits(['update:loading', 'update:dataList'])
const props = defineProps({
  // 加载中
  loading: {type: Boolean, default: true},
  loadMore: {type: String, default: '数据加载中...'},
  noMore: {type: String, default: '—— 没有更多了 ——'},
  // 无数据
  emptyText: {type: String, default: '暂无相关商品~'},
  emtpyIcon: String,
  emtpyIconSize: {type: Number, default: 100},
  // 数据
  dataList: {type: Array, default: []},
  forKey: String, // v-for :key="forKey"
})

const data = reactive({
  loadMode: 'more',
})

const methods = {
  loadMore(promise){
    emits('update:loading', true)
    promise().then(res=>{
      if(res.length){
        emits('update:dataList', props.dataList.concat(res))
        emits('update:loading', false)
      }else{
        data.loadMode = 'noMore'
        if(props.dataList.length == 0) emits('update:loading', false)
      }
    })
  }
}

defineExpose({
  loadMore: methods.loadMore
})
</script>
