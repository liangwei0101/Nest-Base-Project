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