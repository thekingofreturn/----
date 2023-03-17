<template lang="pug">
view.has-page-bgcolor
  view.mod.tip 点亮所需要的包包，图片颜色仅供参考，订阅后所有的<text class="txt red">颜色、尺寸、款式</text>都会提醒!
  view.flex.search-box
    view.grow: asearchbar(@search="methods._search")
    picker.p-r-25.flex.after.triangle.down.txt.brown(:range="data.region.items" range-key="a_name" :value="data.region.i" @change="methods._region")
      view {{ data.region.i>-1? data.region.items[data.region.i]?.a_name: '地区' }}
  atab(v-if="data.tab.items.length" v-model:active="data.tab.i" :tabs="data.tab.items"  v-slot:content="{index}" :click="methods._tab" :reachBottom="methods.more")
    view.goods-list.af.clear
      alist(v-if="data.tabReady" v-slot="{index: i, item: n}" v-model:dataList="data.lists[index]" v-model:loading="data.loadings[index]" :ref="(el)=>pureData.DataLists[index] = el")
        view.g.center.rel.bsbb.mod.af
          aimg.pic(:src="n.g_pic_long")
          view.txt.primary.e2 {{n.g_name}}
          template(v-if="1")
            view.txt.brown.m-t-25(v-if="n.conclude" @click="methods._cancel(index, i)") 取消订阅
            view.flex.center.m-t-25(v-else @click="methods._subscribe(index, i)")
              aimg(src="1_0" svg)
              view.m-l-20 订阅
</template>
<script setup>
import {reactive} from 'vue'
import {goodsCate, goodsList, subscribeCommit, subscribeCancel, payRegion, bindShare} from '/common/config/url.json'
import {useCache} from '/common/script/cache'
import {__get, __post} from '/common/script/req.promise'
import {_tip, _go} from '/common/script/tip'
import {globalData} from '/common/script/tools'
import {onLoad, onShow, onShareAppMessage, onShareTimeline} from '@dcloudio/uni-app'

const User = useCache()
const data = reactive({
  tab: { items: [], i: 0},
  lists: [],
  loadings: [],
  tabReady: false,
  region: {items: [], i: 0}, // 可选地区
})

const pureData = {
  cates: [],
  pages: [],
  DataLists: [],
  keyword: '',
}
const methods = {
  _search(keyword){
    pureData.keyword = keyword
    const len = data.tab.items.length

    data.lists = Array(len).fill([])
    data.loadings = Array(len).fill(true)
    pureData.pages = Array(len).fill(1)

    methods._tab(data.tab.i)
  },
  _region(e){
    data.region.i=e.detail.value
    methods._search(pureData.keyword)
  },
  _tab(i){
    data.tabReady = true
    if(i == data.tab.items.length - 1 && globalData('myFavRefresh')){ // 如果有订阅相关操作则需要刷新我的订阅
      globalData({myFavRefresh: false})
      data.lists[i] = []
      pureData.pages[i] = 1
    }

    const page = pureData.pages[i]
    let dl = null

    if(page == 1){
      const siv = setInterval(()=>{
        dl = pureData.DataLists[i]
        if(dl){
          clearInterval(siv)
          methods.more(i)
        }
      }, 30)
    }
  },
  more(i){
    const page = pureData.pages[i]
    const {b_id} = pureData.cates[i]
    const {a_id} = data.region.items[data.region.i]
    const DataList = pureData.DataLists[i]
    const {keyword} = pureData
    page && DataList.loadMore(()=>{
      return __get(goodsList, {b_id, a_id, page, keyword}).then(res=>{
        pureData.pages[i] = res.length? page+1: 0
        return res
      })
    })
  },
  _subscribe(index, i){
    const {g_id} = data.lists[index][i]
    const {a_id} = data.region.items[data.region.i]
    __get(subscribeCommit, {g_id, a_id}).then(res=>{
      _tip('订阅成功')
      data.lists[index][i].conclude = 1
      globalData({myFavRefresh: true})
    }).catch(err=>{
      _tip(err.msg)
      if(err.code == 20){
        setTimeout(()=>{
          globalData({payTypesTab: index, payTypesRegion: a_id})
          _go('/pages/pay/index', 3)
        }, 1000)
      }
    })
  },
  _cancel(index, i){
    const {g_id} = data.lists[index][i]
    const {a_id} = data.region.items[data.region.i]
    __get(subscribeCancel, {g_id, a_id}).then(res=>{
      _tip('取消订阅成功')
      if(index == data.tab.items.length - 1){// 在我的订阅tab取消
        const [delG] = data.lists[index].splice(i, 1)
        let flag = true
        data.lists.forEach((d,idx)=>{// 将非商品tab中的商品状态更改
          if(idx != index && flag){
            const _i = d.findIndex(_g=>_g.b_id == delG.b_id  && _g.g_id == delG.g_id)
            if(_i > -1){
              flag = false
              data.lists[idx][_i].conclude = 0
            }
          }
        })
      }else{
        data.lists[index][i].conclude = 0
        globalData({myFavRefresh: true})
      }
    }).catch(err=>{ _tip(err.msg) })
  },
  shareData(){
    const {uid = 0} = User.data
    return {
      path: `/pages/index/index?share_uid=${uid}`,
    }
  },
  shareBind(){
    
    const {scene,  query: {share_uid = 0}} = uni.getLaunchOptionsSync()
   
    //https://developers.weixin.qq.com/miniprogram/dev/reference/scene-list.html
    if([1007, 1011, 1012, 1013, 1025, 1036, 1047, 1048, 1049, 1096, 1154, 1155].includes(scene)){
      if(share_uid){
        console.log(share_uid+'yyyyyyyyyy')
        __post(bindShare, {share_uid, scene})
      }
    }
  }
}

onShow(()=>{
  if(globalData('indexPageRefresh')){// 有购买行为则刷新页面
    globalData({indexPageRefresh: false})
    methods._search(pureData.keyword)
  }
})
onLoad(()=>{
  __get(goodsCate).then(res=>{
    const {list} = res
    list.push({b_id: 0, b_name: "我的订阅"})
    pureData.cates = list
    const len = list.length

    data.lists = Array(len).fill([])
    data.loadings = Array(len).fill(true)
    pureData.pages = Array(len).fill(1)
    pureData.DataLists = Array(len).fill(null)

    data.tab.items = list.map(n=>n.b_name)
  })
  __get(payRegion).then(res=>{
    data.region.items = res.list
  }).then(()=>{
    const {top1_uid = 0} = User.data
    if(!top1_uid) methods.shareBind()
  })
})
onShareAppMessage(methods.shareData)
onShareTimeline(methods.shareData)
</script>
<style lang="scss" scoped>
@import '/common/scss/mixin.scss';
.has-page-bgcolor{
  --page-bgcolor: #fafafa;
  --page-body-padding: 0 25rpx;
  --search-bar-bgcolor: #f4f4f4;
  --search-bar-radius: 50px;
  --search-bar-padding: 0 15rpx 0 30rpx;

  :deep(.tab-box){
    --tab-box-bgcolor: transparent;
    --tab-box-color: transparent;
    --tab-active-color: #161615;
    --underline-height: 2px;

    .underline{
      margin-top: -6px;
      border-radius: 10px;
    }
    .tab-tit{
      color: var(--tab-color, var(--font-color-grey));
      // width: auto;
      &.active{
        --tab-color: var(--font-color-primary);
      }
    }
    .a-content{
      --tabHeight: calc(46px + (var(--font-size) * 2) + 80rpx);
    }
  }
  .goods-list{
    --empty-box-height: 400rpx;
    --border: 1px solid #EEEEEE;
    border-top: var(--border);
    .g{
      width: 375rpx;
      float: left;
      border-bottom: var(--border);
      font-weight: 300;
      &::after{
        position: absolute;
        top: 0; right:-0.5px;
        height: 100%;
        border-right: var(--border);
      }
      .pic{
        --aimg-width: 200rpx;
        --aimg-display: inline-block;
      }
    }
    &::after{
      height: 45rpx;
    }
  }
  :deep(.a-list-box){
    .list-box::after{
      content: "";
      display: block;
      clear: both;
    }
  }
  .triangle::after{
    --triangle-color: var(--font-color-brown);
    margin-left: 15rpx;
    margin-bottom: -15rpx;
  }
}
</style>