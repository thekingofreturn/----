<script setup>
import {_tip} from '/common/script/tip'
import {onUnhandledRejection} from '@dcloudio/uni-app'
onUnhandledRejection((res)=>{
  if(res?.reason?.msg) _tip(res.reason.msg)
})
</script>
<style lang="scss">
@import '/common/scss/base.scss';
</style>
