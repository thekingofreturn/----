class date{
  /**
   * 时间相关
   * 1. 获取当前(某个)时间的年月日时分秒
   * 2. 倒计时至某时间的时分秒
   * @param {dateString} D 
   * @param {Boolean} downer 倒计时
   * 
   * 2022.11.28
   */
  constructor(D){
    this.today = D?new Date(D):new Date
  }
  get Y(){ return this.pad0(this.today.getFullYear()) }
  get m(){ return this.pad0(this.today.getMonth()+1) }
  get d(){ return this.pad0(this.today.getDate()) }
  get _d(){ return this.today.getDate() }
  get w(){ return this.today.getDay() }
  get H(){ return this.pad0(this.today.getHours())}
  get i(){ return this.pad0(this.today.getMinutes())}
  get s(){ return this.pad0(this.today.getSeconds())}

  get week(){ return `周${this._week}` }
  get _week(){ return ['日','一','二','三','四','五','六'][this.w] }
  get Ymd(){ return `${this.Y}-${this.m}-${this.d}`}
  get YmdHi(){ return `${this.Y}-${this.m}-${this.d} ${this.H}:${this.i}`}
  get now(){ return this.today.getTime()}
  
  // 其他天
  nextDay(day = 1){// 接受负值
    return new date(new Date(this.Ymd).getTime() + day * 86400000)
  }

  // 数字前面无0加0
  pad0(number){
    return number.toString().padStart(2,'0')
  }

  // 倒计时器
  timedowner(){
    const seconds = Math.floor((this.today.getTime() - Date.now())/1000)
    let his = {h: '00', i: '00', s: '00'}
    
    if(seconds>0){
      his.h = this.pad0(Math.floor(seconds / 3600))
      his.i = this.pad0(Math.floor( (seconds - Number(his.h) * 3600) / 60))
      his.s = this.pad0((seconds % 60))
    }
    return {...his}
  }
}

export function useDate(D){
  return new date(D)
}