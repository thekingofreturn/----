/**
 * 缓存读取处理
 */
import {userStorageKey} from '@/common/config/app.json'
class Cache {
  key = userStorageKey
  constructor(key = '') {
    if(key) this.key = key
  }
  get data(){
    return uni.getStorageSync(this.key) ?? {}
  }
  /**
   * 传对象更新，不传或传字符串清空
   */
  set data(kv = 'CLEAR'){
    let _data = {}
    if(typeof kv != 'string' && Object.keys(kv).length > 0){
      _data = {...this.data, ...kv}
    }
    uni.setStorageSync(this.key, _data)
  }
}

export function useCache(key){
  return new Cache(key)
}