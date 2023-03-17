<template lang="pug">
view.my-index.has-page-bgcolor.mod
  auserbar
  //- view.user-bar.flex
    aimg(:src="data.user.avatarurl")
    view.m-l-25.p-l-15.bold.large {{ data.user.nickname || `用户${data.user.uid}` }}	
  view.order.shadow
    view.bold 套餐列表
    view.m-t-25.bg.white.mod
      view.empty.center.mod(v-if="data.orders.length == 0")
        aimg(src="3_2_0" svg)
        view.txt.light.m-t-15.small 当前暂无其他套餐信息
      template(v-else)
      view.m-b-25(v-for="n in data.orders")
        view.table
          view.tr
            view.th 品牌名称
            view.th 套餐名称
            view.th 状态
          view.tr
            view.td {{ n.b_name }}
            view.td {{ n.s_name }}
            view.td {{ n.use_state_txt }}
          view.tr
            view.th 地区
            view.th 到期时间
          view.tr
            view.td {{ n.a_name }}
            view.td {{ n.end_date }}
  view.service.flex.m-t-25.shadow.bg.white.mod
    view.grow
      view.bold.m-b-10 微信客服
      view.txt.grey.small 扫一扫添加客服
    aimg(:src="data.qrcode")
  view
    official-account
	
</template>
<script setup>
import {reactive} from 'vue'
import {userId, baseConfig, orderList} from '/common/config/url.json'
import {__get, __post} from '/common/script/req.promise'
//import {_tip, _go} from '/common/script/tip'
import {onLoad, onShow} from '@dcloudio/uni-app'
import {globalData} from '/common/script/tools'

const data = reactive({
  user: {},
  qrcode: '',
  orders: []
})

const pureData = {
  refresh: false
}

onShow(()=>{
  if(globalData('myPageRefresh')){// 有购买行为则刷新页面
    globalData({indexPageRefresh: false})
    pureData.refresh = true
  }
  if(pureData.refresh){
    pureData.refresh = false
    __get(orderList).then(res=>{
      data.orders = res.list
    })
  }
})
onLoad(()=>{
  pureData.refresh = true
  __get(userId).then(res=>{ data.user = res.user_info })
  __post(baseConfig, {key: ['staff_qrcode']}).then(res=>{
    data.qrcode = res.staff_qrcode
  })
})
</script>
<style lang="scss" scoped>
@import '/common/scss/mixin.scss';
@import '/common/scss/table.scss';

.has-page-bgcolor{
  --user-bar-padding: 0 0 65rpx 0;
  .shadow{
    box-shadow: 4rpx 4rpx 4rpx 0rpx rgba(0,0,0,0.04);
    border-radius: 8rpx;
  }
  .order{
    .th{
      font-size: var(--small);
      color: var(--font-color-grey);
      padding-bottom: 0;
    }
    .empty{
      --aimg-width: 100rpx;
      --aimg-display: inline-block;
    }
  }
  .service{
    --aimg-width: 180rpx;
  }
}
</style>X