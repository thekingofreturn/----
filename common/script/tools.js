/**
 * 让标签样式兼容移动端
 * @param {String} html 要处理的html
 * @param {String} tag 要处理的标签
 */
const removeTagWidthHeight = (html, tag ='img')=>{
  return html == void 0? '': html.replace(new RegExp(`<${tag}[^>]*?>`, 'ig'), (match)=>{    
    return match.replace(new RegExp(`<${tag}[^>]*?>`, 'ig'), (_tag)=>{
      let defaultStyle = 'max-width:100%; height: auto; box-sizing:border-box;'
      if(_tag.indexOf('style') > -1){
        _tag = _tag.replace(/style=('|")([^\1]*?)\1/ig, (_match, symbol, style)=>{
          style = 'max-width: 100%; height: auto; box-sizing: border-box;' + style
          return `style="${style}"`
        })
      }else{// 存在没有style的情况
        _tag = _tag.replace(new RegExp(`(<${tag})`, 'i'), `$1 style="${defaultStyle}"`)
      }
      return _tag
    })
  })
}
/**
 * 移除所有标签的宽与高
 * @param {String} html 要处理的html
 * @param {String} tag 要处理的标签
 */
 const removeAllTagWidthHeight = (html)=>{
  const {windowWidth: maxWidth} = uni.getSystemInfoSync()
  return html == void 0? '': html
        .replace(/max-(width|height)\s*:\s*[^;"]*;?/g, '')
        .replace(/height\s*:\s*[^;"]*;?/g, '')
        .replace(/<[^\/][^>]{8,}>/ig, (tag)=>{
          let style = ['max-width:100%;']
          const hasStyle = tag.indexOf('style') > -1
          const removeHeight = false
          tag = tag.replace(/(width|height)\s*=(\s*[^\s>]+)/, (str, k, v)=>{
            v = v.replace(/"/g, '')
            if(v.indexOf('px') == -1) v += 'px'
            style.push(`${k}:${v};`)
            if(k == 'width' && parseInt(v) > maxWidth){// 宽度超过屏幕，如有高度则移除高
              removeHeight = true
            }
            return ''
          })
          style = style.join('')
          if(removeHeight) style.replace(/height:[^;]+;/, '')
          
          if(hasStyle){
            if(style.length) tag = tag.replace(/style\s*=\s*"/, `style="${style}`)
            return tag
          }else{
            tag = tag.replace(/\s+/g, ' ')
            if(style.length) tag = tag.replace(/(\/>|>)/, ` style="${style}"$1`)
            return tag
          }
        }).replace(/;+/g, ';').replace(/\s*>/g, '>')
}
/**
 * 将html变成指定长度的字符串
 * @param {String} htmlstring 要处理的html
 * @param {Number} len 指定长度
 */
const short = (htmlstring, len = 50)=>html? html.replace(/<[^>]*?>/g, '').slice(0, len): ''

/**
 * 隐藏中间的字符，如手机号、身份证号
 * @param {String} str 要隐藏的字符串
 * @param {Number} first 保留开头几位
 * @param {Number} end 保留结尾几位
 * @param {String} holder 占位符
 */
const hide = (str, first = 4, end = 2, holder='*')=>{
  str += '' // 如果字符超过15会出现精度问题
  let flag = str.length - first - end
  return flag > 0 ? (str.slice(0, first) + holder.repeat(flag) + str.slice(end * -1)) : str
}
  
/**
 * 传入一个请求路径和路径参数，得到一个拼接成url?query的字符串
 * @param {Object} params 
 * @param {String} path 
 */
const url = (params = {}, path = '')=>{
  let _params = []
  for(const [k,v] of Object.entries(params)){
    _params.push(`${k}=${v}`)
  }
  return (path? (path+'?'): '')+_params.join('&')
}

/**
 * 全局变量的设定更新与读取
 * 读取：
 * k = String时，表示传入字符串，直接返回键为字符串的值
 * k = Array时，表示传入键数组，则返回键值对象
 * 设定或更新
 * k = Object时，表示传入对象，创建或更新相应键值
 * v !== undefined时，表示创建以k为键，以v值的键值
 * 
 * @param {String|Array|Object} k
 * @param {any} v
 */
const globalData = (k, v)=>{
  const app = getApp()
  if(v !== void 0){
    app.globalData[k] = v
  }else{
    switch(k.constructor){
      case String:
        return app.globalData[k]
      break; case Array:
        return Object.fromEntries( k.map(_k=>[_k, app.globalData[_k]]) )
      break; case Object:
        Object.assign(app.globalData, k)
      break;
    }
  }
}

/**
 * 获取当前页面对象
 */
const getCurrentPage = ()=>{
  const pages = getCurrentPages()
  return pages[pages.length - 1]
}

/**
 * 获取当前页面的参数
 */
const pageOptions = ()=>{
  let options = {}
  // #ifdef MP
  options = getCurrentPage().options
  // #endif
  return options
}

/**
 * 为当前页面(历史)设置页面参数
 * @param {object} options 要设置的参数对象
 * @param {number} delta 1为当前页，默认为上一页
 */
const setPageOptions = (options, delta = 2)=>{
  const pages = getCurrentPages()
  const page = pages[pages.length - delta]
  Object.assign(page.options, options)
}

/**
 * 删掉对象中的冗余数据，用于设置vue响应对象前，将值瘦身
 * @param {Objecdt} obj 
 * @param {Array} keys 
 */
const delRedundantData = (obj, keys=[])=>{
  keys.forEach(k=> delete obj[k])
  return obj
}

export {
  removeTagWidthHeight, removeAllTagWidthHeight,
  short, hide,
  url,
  globalData,
  getCurrentPage, pageOptions, setPageOptions,
  delRedundantData
}