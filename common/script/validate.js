export function SFID(card) {// 身份证校验
  const cityCode = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82, 91]
  card += ''
  const len = card.length
  const result = {err: false, msg: ''}
  const setResult = (reg, msg)=>{
    if(!reg){
      result.msg = msg
      result.err = true
    }
    return reg
  }
  setResult(/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(card), '长度或格式不正确') &&
  setResult(cityCode.includes(card.slice(0, 2) / 1), '校验省份失败') &&
  setResult((()=>{
    let [,,y,m,d] = card.match(len ==18 ?/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/ :/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/)
    y = Number(('19'+y).slice(-4))
    return !isNaN(Date.parse(`${y}-${m}-${d}`))
  })(), '校验生日失败') &&
  setResult((()=>{
    let n = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    let ch = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    if(len == 18){
      const end = ch[n.map((c,i)=>c*card[i]).reduce((p,ne)=>p+ne) % 11]
      return end == card.slice(-1)
    }else{// 15位身份证不校验
      return true
    }
  })(), '校验位校验失败')

  return result
}

export function plateNumber(number){// 车牌号
  return /^([京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][1-9DF][1-9ABCDEFGHJKLMNPQRSTUVWXYZ]\d{3}[1-9DF]|[京津晋冀蒙辽吉黑沪苏浙皖闽赣鲁豫鄂湘粤桂琼渝川贵云藏陕甘青宁新][ABCDEFGHJKLMNPQRSTUVWXY][\dABCDEFGHJKLNMxPQRSTUVWXYZ]{5})$/.test(number.toUpperCase())
}