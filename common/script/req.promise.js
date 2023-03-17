/**
 * 数据请求相关
 */
import {host, controller, userStorageKey} from "/common/config/app.json"
import {login, upload} from "/common/config/url.json"
import {getCurrentPage} from "/common/script/tools"

/**
 * 拼接全路径，不暴露在外
 */
const url = (uri)=>{
  let http = host
  // #ifdef H5
  if(process.env.NODE_ENV == 'production') http = ''
  // #endif
  http += controller? `/${controller}`: ''
  if(uri.indexOf('://') == -1) uri = `${http}/${uri}`.replace(/([^:])\/{2}/g, '$1/')
  return uri
}

/**
 * 主请求函数，不暴露在外
 * @param {String} uri config/url.json中的对应值
 * @param {Object} args 请求参数列表
 * @param {String} method 大写 get|POST
 */
const request = (uri = '', args = {}, method = 'GET', unParse = false) => {
  let userinfo = uni.getStorageSync(userStorageKey)
  let token = userinfo?.token || ''
  let header = {'content-type': 'application/json;charset=utf-8', token}
  let config = { url: url(uri), data: args, method, header }

  return new Promise((resolve, reject)=>{
    config.success = (res)=>{
      if(unParse){
        return resolve(res.data)
      }
      let {code, data, msg} = res.data
      switch(code / 1){
        case 0: // 正常
          resolve(data)
        break; case 1: // 常规错误
          reject(res.data)
        break; case 2: // 未登录或token过期
          tologin(uri, args, method).then(resolve).catch(reject)
        break; default: // 其他错误
          reject(res.data)
      }
    }
    config.fail = (res)=>{
      reject(res)
    }
    config.complete = ()=>{}
    uni.request(config)
  })
}

/**
 * 自动登录方法，不暴露在外
 */
const tologin = (uri, data, method) => {
  // #ifdef MP
  return new Promise((resolve, reject)=>{
    uni.login({
      provider: 'weixin',
      success(res){
        let {code} = res
        
        request(login, {code}, 'POST').then((res)=>{
          try{
            uni.setStorageSync(userStorageKey, res.userinfo || res)

            if(uri){
              request(uri, data, method).then((res)=>{
                resolve(res)
              }).catch((res)=>{
                reject(res)
              })
            }else{
              resolve(res)
            }
          }catch(err){
            reject(err)
          }
        })
      }
    })
  })
  // #endif
  // #ifdef H5
  const {openid} = uni.getStorageSync(userStorageKey)
  request(login, {type: 'openid', value: openid}).then((res)=>{
    try{
      uni.setStorageSync(userStorageKey, res)
      request(uri, data).then((res)=>{
        resolve(res)
      }).catch((res)=>{
        reject(res)
      })
    }catch(err){
      reject(err)
    }
  })
  // #endif
}


/**
 * 页面是否准备就绪
 * H5非堵塞请求，会异步执行，此时所需的token等并没有初始化
 */
const __ready = ()=>{
  return new Promise((resolve,reject)=>{
    let user = uni.getStorageSync(userStorageKey)
    if(!user.token){
      setTimeout(()=>{
        return __ready().then(resolve)
      },25)// 间隔，避免过多无效请求
    }else{
      resolve(user)
    }
  })
}

/**
 * 拍摄或从手机相册中选择图片或视频
 * @link https://developers.weixin.qq.com/miniprogram/dev/api/media/video/wx.chooseMedia.html
 * @param {String|Array} mediaType 文件类型 image/video/mix
 * @param {Number} count 最多可以选择的文件个数
 * @param {String|Array} sizeType  ['original', 'compressed']
 */
const choose2upload = (mediaType='mix', count=6, sizeType='compressed')=>{
  return new Promise((resolve, reject)=>{
    uni.chooseMedia({mediaType, count, sizeType}).then(res=>{
      let len = res.tempFiles.length
      let src = [] 
      res.tempFiles.forEach(f=>{
        toUpload(f.tempFilePath, 'file', upload).then(res=>{
          src.push(res.url)
          if(src.length == len){
            resolve(src)
          }
        }).catch(reject)
      })
    })
  })
}


/**
 * 上传图片|视频，不暴露在外
 * @param {String} filePath 临时路径
 * @param {String} name file提交给服务器的对应name值
 * @param {String} uri 上传的接口
 */
const toUpload = (filePath, name='file', uri='upload')=>{
  return new Promise(async(resolve, reject)=>{
    let uploader = await uni.uploadFile({
      url: url(uri),
      filePath, name
    })
    let json = JSON.parse(uploader.data)
    if(!json.code){
      resolve(json.data)
    }else{
      reject(json)
    }
  })
}

/**
 * 获取分页数据
 * @param {String} uri 请求的接口
 * @param {Object} args 请求携带的参数
 * @param {Boolean} append 是否追加数据
 */
 const getListData = (uri, args)=>{
  let [usePageByCreate, page, P] = [args.page === void 0]
  if(usePageByCreate){// 不携带page参数时，在当前页面创建一个page相关参数
    const getP = ()=>{
      const P = getCurrentPage()
      if(P.page4getListData === void 0) P.page4getListData = 1
      return P
    }
    P = getP()
    page = P.page4getListData
  }else{
    page = args.page
  }
  
  return new Promise((resolve, reject)=>{
    if(page){
      Object.assign(args, {page})
      request(uri, args).then((res)=>{
        const list = Array.isArray(res)? res: res.list
        if(usePageByCreate) P.page4getListData = list.length? page+1: 0
        resolve(list)
      }).catch(reject)
    }else{
      console.log({msg: '没有更多数据'})
    }
  })
}

/**
 * 合并多个promise一同返回
 * @param {Array} reqs 有参[{uri: 'uri', data: {k: 'v'}},]或无参['uri1', 'uri2']
 * @returns 
 */
const reqAll = (reqs)=>{
  reqs = reqs.map(r=>{
    return typeof(r) == 'string' ? {uri: r} : r
  })
  return Promise.all(reqs.map(r=>request(r.uri, r.data)))
}

const __get = (uri, data)=>request(uri, data)
const __getPure = (uri, data)=>request(uri, data, 'GET', true)
const __getAll = (reqs)=>reqAll(reqs)
const __getListData = (uri, args={})=>getListData(uri, args)
const __post = (uri, data)=>request(uri, data, 'POST')
const __postImage = (filePath, name)=>toUpload(filePath, name, upload)
const __postVideo = (filePath, name)=>toUpload(filePath, name, uploadVideo)
const __choose2upload = ()=>choose2upload()
const __tologin = ()=>tologin()
const __url = (uri)=>url(uri)

export {
  __get, __getAll, __getListData, __getPure,
  __post, 
  __tologin,
  __postImage, __postVideo,
  __choose2upload,
  __ready,
  __url
}
