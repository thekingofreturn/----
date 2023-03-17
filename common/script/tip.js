import {SFID, plateNumber} from '/common/script/validate'
/**
 * 一个提示，支持提示结束后promise回调
 * @param {String} title 提示语 
 * @param {String|Number} icon 图标或者持续时长
 * @param {Number} duration 持续时长
 * @return Promise
 */
export function _tip(title, icon= 'none', duration = 1500){
  typeof icon == 'number' && ([duration, icon] = [icon, 'none']); //icon支持传入icon或者duration
  return new Promise((resolve)=>{
    uni.showToast({title, duration, icon, mask: true})
    setTimeout(()=>{
      resolve()
    }, duration)
  }) 
}

/**
 * 弹出一个确认框
 * @param {String} content 确认内容
 * @param {String|Boolean} title 确定标题或是否显示取消按钮
 * @param {Boolean} showCancel 是否显示取消按钮
 * @return Promise reslove=点击了确认按钮
 */
export function _verify(content, title = '', showCancel = true){
  typeof title == 'boolean' && ([showCancel, title] = [title, ''])
  let data = {content, showCancel}
  if(title.length) data.title = title
  return new Promise((resolve, reject)=>{
    uni.showModal(data).then(res=>{
      if(res.confirm) resolve()
    })
  })
}

/**
 * 跳转
 * @param {String|Number} url 要跳转的page或要返回的层数
 * @param {Number} type 0: navigateTo, 1: redirectTo, 2: reLaunch, 3: switchTab
 * @return void
 */
export function _go(url, type=0){
  if(typeof url == 'number'){
    uni.navigateBack({delta: url})
  }else{
    switch(type){
      case 0:
        uni.navigateTo({url})
      break; case 1:
        uni.redirectTo({url})
      break; case 2:
        uni.reLaunch({url})
      break; case 3:
        uni.switchTab({url})
      break;
    }
  }
}

/**
 * 判断一个表达式是否不符合条件，express为true时，弹出提示框，返回false
 * @param {Boolean|String|Number} express 当regName==''时为能够返回布尔值的判定表达式，否则为regName对应的参数
 * @param {String} errMsg 
 * @param {String} regName 特定的匹配表达式名
 * @returns Boolean
 */
 export function _feedback(express, errMsg, regName = ''){
  switch(regName){
    case 'mobile':
      express = !(/^1[3-9]\d{9}$/.test(express))
    break; case 'idcard':
      express = SFID(express).err
    break; case 'required':
      express = express.length == 0
    break; case 'plateNumber':
      express = !plateNumber(express)
    break;
  }
  if(express) _tip(errMsg)
  return !express
}