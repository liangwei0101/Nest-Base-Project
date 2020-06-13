/**
 * 获取某月开始日期
 */
export const getSomeMonthStartDate = (date = new Date()): Date => {
  const nowMonth = date.getMonth(); //当前月 
  const nowYear = date.getFullYear(); //当前年
  const monthStartDate = new Date(nowYear, nowMonth, 1);
  return monthStartDate;
}

/**
* 获取某月结束日期
*/
export const getSomeMonthEndDate = (date = new Date()): Date => {
  const nowMonth = date.getMonth(); //当前月 
  const nowYear = date.getFullYear(); //当前年
  var monthEndDate = new Date(nowYear, nowMonth + 1, 0);
  return monthEndDate;
}

/**
  * 获取当前时间的时间戳的字符串
  */
export const getnowTimeStrStampStr = () => {
  let nowTimeStr = '';

  const now = new Date(Date.now());
  nowTimeStr += now.getFullYear().toString() + '-';
  const month = now.getMonth();
  nowTimeStr += getTimeAddZeroStr(month + 1);
  nowTimeStr += now.getDate().toString() + '-';
  const hours = now.getHours();
  nowTimeStr += getTimeAddZeroStr(hours);
  const minutes = now.getMinutes();
  nowTimeStr += getTimeAddZeroStr(minutes) + '-';
  const seconds = now.getSeconds();
  nowTimeStr += getTimeAddZeroStr(seconds);
  const milliseconds = now.getMilliseconds();
  let millisecondsStr = '';
  if (milliseconds < 10) {
    millisecondsStr = '00' + milliseconds;
  } else if (milliseconds >= 10 && milliseconds < 100) {
    millisecondsStr = '0' + milliseconds;
  } else {
    millisecondsStr = milliseconds.toString();
  }
  nowTimeStr += millisecondsStr;

  return nowTimeStr;
}

/**
* 获取当前时间的时间位不够10补0的字符串
*/
function getTimeAddZeroStr(num: number) {
  let numStr = '';
  if (num < 10) {
    numStr += '0' + num;
  } else {
    numStr = num.toString();
  }
  return numStr;
}