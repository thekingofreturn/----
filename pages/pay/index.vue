<template lang="pug">
view.pay-index.has-page-bgcolor
  view.step-0.af.clear.mod(v-if="data.step == 0")
    alist(v-slot="{index: i, item: n}" v-model:dataList="data.region.list" v-model:loading="data.region.loading" :ref="(el)=>pureData.DataList.step0 = el")
      view.region.m.flex.center.bg.white(@click="methods._pickRegion(i)" :class="{'m-r-15': i%2 == 0}")
        view.m-r-25.large.bold {{ i+1 }}
        view.country.p-l-10
          view.txt.bold {{ n.a_name }}
          view.txt.grey.small.m-t-10 {{n.a_name_en}}
  view.step-1.af.clear(v-if="data.step == 1")
    atab(v-if="data.payTypes.tab.items.length" underlineWidth="25px" v-model:active="data.payTypes.tab.i" :tabs="data.payTypes.tab.items" v-slot:content="{index}" :click="methods._tab")
      view.type-list.af.clear
        alist(v-if="data.payTypes.tab.ready" v-slot="{index: i, item: n}" v-model:dataList="data.payTypes.lists[index]" v-model:loading="data.payTypes.loadings[index]" :ref="(el)=>pureData.DataList.step1[index] = el")
          view.t.m.bsbb.bg.white(@click="data.payTypes.sels = [index, i]" :class="(i-1)%3 == 0?'m-r-15 m-l-15':''")
            view.flex
              view.bold.grow {{ n.s_name }}
            view.small.txt.light {{ data.region.list?.[data.region.i]?.a_name }}
            view.flex.divider
              view.grow
                view.txt.red.rmb.m-r-15.bold.large.grow {{ Math.floor(n.s_price) }}
                view.txt.grey.through.small.grow 原价:{{ Math.floor(n.s_original_price) }}
              aimg(src="2_1_0" svg v-if="data.payTypes.sels[0] == index && data.payTypes.sels[1] == i")
    view.flex.between.btns.m-t-25.p-t-25.mod
      view.btn.plain(@click="()=>_tip('请联系客服~')") 升级套餐
      view.btn(@click="methods._pay") 立即订阅

    view.m-t-25.p-t-10.txt.brown.mod
      view.article(v-html="data.payTypes.text")
</template>
<script setup>
import {reactive, nextTick} from 'vue'
import {payRegion, payType, goodsCate, baseConfig, payCommit} from '/common/config/url.json'
import {__get, __post} from '/common/script/req.promise'
import {_tip, _go} from '/common/script/tip'
import {globalData} from '/common/script/tools'
import {onLoad, onShow} from '@dcloudio/uni-app'

const data = reactive({
  step: 0,
  region: {loading: true, list: [], i: 0},
  // loadings: [true, true],
  // cate: [],
  payTypes: {
    tab: {items: [], i: 0, ready: false},
    loading: [],
    lists: [],
    sels: [-1, -1], // 选中的套餐
    text: '', // 订购须知
  },
})

const pureData = {
  DataList: {step0: null, step1: []},
  pages: [],
  cates: [],
}

const methods = {
  _getDataList(key, i = -1){
    let dl = null
    return new Promise((resolve)=>{
      const siv = setInterval(()=>{
        dl = i > -1 ?pureData.DataList[key][i]: pureData.DataList[key] 
        if(dl){
          clearInterval(siv)
          resolve(dl)
        }
      }, 30)
    })
  },
  _tab(i){
    data.payTypes.tab.ready = true
    if(pureData.pages[i] == 1){
      pureData.pages[i] = 0 // 不分页
      methods._getDataList('step1', i).then(dl=>{
        const {b_id} = pureData.cates[i]
        const {a_id} = data.region.list[data.region.i]
        dl.loadMore(()=>{
          return __get(payType, {b_id, a_id}).then(res=>{
            return res.list
          })
        })
      })
    }
  },
  _loadPayTypes(){
    __post(baseConfig, {key: ['know']}).then(res=>{
      data.payTypes.text = res.know
    })
    
    return __get(goodsCate).then(res=>{
      pureData.cates = res.list
      const len = res.list.length

      data.payTypes.lists = Array(len).fill([])
      data.payTypes.loadings = Array(len).fill(true)
      pureData.DataList.step1 = Array(len).fill(null)
      pureData.pages = Array(len).fill(1)

      data.payTypes.tab.items = res.list.map(n=>n.b_name)
    })

  },
  _pickRegion(i){
    if(i > -1){// 从首页会带地区参数而来，但有可能错误
      data.region.i = i
      methods._loadPayTypes().then(()=>{
        nextTick(()=>{
          data.step = 1
        })
      })
    }
  },
  _pay(){
    const [index, i] = data.payTypes.sels
    if(index == -1){
      _tip('请选择订阅类型')
    }else{
      const {a_id} = data.region.list[data.region.i]
      const {s_id} = data.payTypes.lists[index][i]
      __post(payCommit, {a_id, s_id}).then(res=>{
        uni.requestPayment(res).then(()=>{
          globalData({indexPageRefresh: true, myPageRefresh: true})
          _tip('订阅成功').then(()=>{
            _go('/pages/index/index', 3)
          })
        }).catch(err=>{ _tip('订阅失败') })
      }).catch(err=>{ _tip(err.msg) })
    }
  }
}

onShow(()=>{
  data.step = 0
  const opt = globalData(['payTypesTab', 'payTypesRegion'])

  const siv = setInterval(()=>{
    if(data.region.list.length){
      if(opt.payTypesRegion) methods._pickRegion(data.region.list.findIndex(r=>r.a_id == opt.payTypesRegion))
      if(opt.payTypesTab) data.payTypes.tab.i = opt.payTypesTab
      clearInterval(siv)
      globalData({payTypesTab: 0, payTypesRegion: 0})
    }
  }, 30)
})

onLoad(()=>{
  methods._getDataList('step0').then(dl=>{
    dl.loadMore(()=>{
      return __get(payRegion).then(res=>{
        return res.list
      })
    })
  })
})
</script>
<style lang="scss" scoped>
@import '/common/scss/mixin.scss';
.m{
  float: left;
  margin-top: 25rpx;
  width: 342.5rpx;
  box-shadow: 4rpx 4rpx 4rpx 0rpx rgba(0,0,0,0.04);
  border-radius: 8rpx;
}
.step-0{
  .region{
    padding: 50rpx 0;
    .large{
      color: #DDDDDD;
      --large: 50rpx;
      font-style:italic;
    }
    .country{
      width: 200rpx;
      text-align: left;
    }
  }
}
.step-1{
  --tab-box-bgcolor: var(--page-bgcolor);
  --tab-box-color: transparent;
  --tab-active-color: #161615;
  --divider-color: rgba(200, 200, 200, 0.2);
  --large: 45rpx;
  --aimg-width: 45rpx;
  .t{
    padding: 25rpx 15rpx;
    margin-top: 0;
    margin-bottom: 25rpx;
    width: 223.3rpx;
  }
  :deep(.tab-box){
    .a-content{
      height: auto!important;
    }
  }
  .type-list{
    padding: 0 25rpx 25rpx 25rpx;
  }
  .btns{
    --btn-radius: 10rpx;
    font-weight: bold;
    .plain{
      --btn-width: 250rpx;
      --btn-border-color: #eee;
      margin:0 25rpx 0 0;
      color: var(--font-color-primary);
    }
    .btn:not(.plain){
      color: #fff;
    }
  }
}
</style>
