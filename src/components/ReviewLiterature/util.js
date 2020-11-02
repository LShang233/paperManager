/**
 * @description 日期时间转换时间戳
 */
export const getTime = dt => {
    return dt ? new Date(dt).getTime() : new Date().getTime()
  }
  
/**
 * @description 时间戳转换日期时间
 */
export const getDate = (format, dt) => {
// dt = dt ? new Date(dt) : new Date();
dt = new Date(dt);
const t = {
    'M+': dt.getMonth() + 1, // 月份
    'd+': dt.getDate(), // 日
    'H+': dt.getHours(), // 小时
    'm+': dt.getMinutes(), // 分
    's+': dt.getSeconds(), // 秒
    'S': dt.getMilliseconds() // 毫秒
}
if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (dt.getFullYear() + '').substr(4 - RegExp.$1.length))
}
for (let k in t) {
    if (new RegExp('(' + k + ')').test(format)) { format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (t[k]) : (('00' + t[k]).substr(('' + t[k]).length))) }
}
return format
}
  
  