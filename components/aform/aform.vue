<template lang="pug">
form.block.form-box(@submit="methods._submit")
  //- 自定义表单头部
  slot(name="beforeItems")
  template(v-for="n,i in items" :key="i")
    //- 完全自定义
    template(v-if="n.type == 'slot'")
      slot(:name="n.name" :label="n.label")
    //- 插入分割线
    template(v-else-if="n.type == 'divider'")
      view.form-divider
    template(v-else)
      view.row.flex.rel(:class="n.name+' '+(n.type||'input')+(n.type=='textarea'?' start':'')")
        view.label(:class="{required: showRequiredPrefix && n.required, unprefix: !showRequiredPrefix}" :hidden="n.un_label") {{n.label}}
        //- 增加右侧内容自定义插槽
        template(v-if="n.type == 'slot-right'")
          view.grow: slot(name="right" :item="n.name" :label="n.label" :placeholder="n.placeholder || `请输入${n.label}`")
        //- switch开关
        template(v-else-if="n.type == 'switch'")
          view.grow
          switch.io(:checked="n.val" :data-k="n.name" @change="methods._action" color="var(--bg-color-red)")
        //- radio选择器
        template(v-else-if="n.type == 'radio'")
          radio-group.grow.flex(@change="methods._radio" :data-name="n.name")
            view.grow
            label.a-radio.flex.inline(v-for="nn,ii in n.vals")
              radio.icon(:value="nn.val" :checked="nn.val == n.val" color="var(--bg-color-red)")
              text {{nn.title}}
          input(:name="n.name" :value="n.val" )
        //- 圆形头像
        template(v-else-if="n.type == 'avatar'")
          view.avatar-box.flex.center.grow
            button.clear(open-type="chooseAvatar" @chooseavatar="methods._avatar")
              aimg.avatar-img.block(:src="n.val || n.placeholder")
              view.m-t-10.small.txt.gray 编辑{{n.label}}
        //- 区域选择器，H5无效
        template(v-else-if="n.type == 'region-picker'")
          // #ifdef MP
          picker.picker.grow(mode="region" :data-k="n.name" @change="methods._action" :value="n.val || []")
            view.arrow.down(:class="n.val?'':'placeholder'") {{n.val?[n.val].join(','):`请选择${n.label}`}}
          // #endif
        //- 日期选择器，H5无效
        template(v-else-if="n.type == 'date-picker'")
          picker.grow(mode="date" :value="n.val || ''" @change="methods._action" :data-k="n.name")
            view(:class="n.val?'':'placeholder'") {{n.val || `请选择${n.label}`}}
        //- 文本域
        template(v-else-if="n.type == 'textarea'")
          view.grow.rel
            textarea.textarea(
             :name="n.name"
             :data-k="n.name"
             :placeholder="n.placeholder || `请输入${n.label}`"
             :maxlength="n.maxlength || -1"
             placeholder-class="placeholder"
             :value="n.val || ''"
             @input="methods._action")
            view.abs.txt.gray(v-if="n.maxlength && n.show_length") {{n.len || 0}}/{{n.maxlength}}
        //- 文本框等其他表单项
        template(v-else)
          view.grow.rel
            input.input(
             :name="n.name"
             :data-k="n.name"
             :placeholder="n.placeholder || `请输入${n.label}`"
             :maxlength="n.maxlength || -1"
             placeholder-class="placeholder"
             :type="n.type || 'input'"
             :value="n.val || ''"
             @input="methods._action")
            view.abs.txt.gray(v-if="n.maxlength && n.show_length") {{n.len || 0}}/{{n.maxlength}}
          //- 支持在内容右侧自定义插槽
          slot(:name="n.name")
  //- 自定义表单底部
  slot(name="beforeBtns")
  view.btns.mod.bsbb.m-auto
    button.clear.btn.submit.round.linear(form-type="submit") {{submitBtn||'提交'}}
</template>
<script setup>
import {_feedback} from '/common/script/tip'
import {__postImage} from '/common/script/req.promise'

const props = defineProps({
  items: Array,
  submit: Function,// 必须是一个Promise函数
  beforeSubmit: Function, // 提交前执行，返回true|false
  submitBtn: String,
  showRequiredPrefix: {type: Boolean, default: true}
})
let postData = {} //最终提交的数据
const methods = {
  validate(){
    let flag = true
    props.items.forEach((n,i)=>{
      if(flag){
        if(n.name!=undefined && postData[n.name]==undefined && n.val!=undefined) postData[n.name] = n.val
        if(n.required){
          if(flag = _feedback(postData[n.name]==undefined || !postData[n.name].length, `${n.label}不能为空！`)){
            if(n.pattern){
              flag = _feedback(typeof n.pattern == 'object'? n.pattern: postData[n.name], `${n.label}填写错误！`, n.pattern)
            }
          }
        }
      }
    })
    return flag
  },
  _submit(e){
    uni.showLoading({title: '提交中..', mask: true})
    postData = e.detail.value
    let flag = props.beforeSubmit? props.beforeSubmit(): true
    if(flag &&methods.validate()){
      try{
        props.submit(postData).then(uni.hideLoading)
      }catch(e){ console.log('props.submit的绑定函数必须是Promise', e) }
    }else{
      uni.hideLoading()
    }
  },
  _action(e){
    const {currentTarget: {dataset: {k}}, detail: {value}} = e
    const i = props.items.findIndex((n)=>n.name == k)
    switch(e.type){
      case 'change':
        props.items[i].val = Array.isArray(value)?value.join(','):value
      break; case 'input':
        props.items[i].len = value.length
      break;
    }
  },
  _avatar(e){
    const {avatarUrl: path} = e.detail
    __postImage(path).then(src=>{
      const i = props.items.findIndex(n=>n.type=='avatar')
      props.items[i].val = src
    })
  },
  _radio(e){
    const {detail: {value}, target: {dataset: {name}}} = e
    console.log(value, name)
  },
}
</script>
<style lang="scss" scoped>
@import '~@/common/scss/mixin.scss';
.form-box{
  .form-divider{
    height: var(--divider-height, 25rpx);
    @include bg(var(--divider-bgcolor, transparent));
    &+.row{--divider-bgcolor: transparent;}
  }
  .row, :slotted(.row){
    padding: var(--form-box-row-padding, 25rpx);
    @include bg(var(--form-box-row-bgcolor, #ffffff));
    .label{
      width: var(--form-box-label-width, 205rpx);
      font-weight: var(--form-box-label-font-weight, 500);
      color: var(--form-box-label-color, inherit);
      &:not(.unprefix):before{content: ""; width: 18rpx; display: inline-block;}
      &.required:before{
        content: "*"; 
        color: #EC422A;
      }
    }
    &:not(:first-child){
      border-top: 1px solid var(--divider-bgcolor, #f0f0f0);
    }
    &.start .label{
      margin-top: -2px;
    }
    &.avatar{
      --aimg-border-radius: 50%;
      --aimg-width: 180rpx;
      .avatar-img{
        padding:15rpx;
        border-radius: var(--aimg-border-radius);
        border:1px solid var(--divider-bgcolor, #f0f0f0);
      }
      & + .row{
        border-top: none;
      }
    }
  }
  .textarea:not(.flex){
    line-height: 1.6;
    height: var(--form-box-textarea-height, 90rpx);
    width: auto;
  }
  .btns{
    position: var(--form-box-btns-position, relative);
    background-color: var(--form-box-btns-bgcolor, #fff);
    left: 0; bottom: 0;
  }
  .textarea,.input{
    &+.abs{
      right: 0;
      bottom: -10rpx;
      font-size: 20rpx;
    }
  }
  .radio{
    .a-radio{margin-left: 45rpx; padding-left: 15rpx;}
    .icon{transform:scale(0.7)}
    input{
      @include avatar(1);
      visibility: hidden;
    }
  }
  .switch .io{ transform: scale(0.8); }
}
</style>