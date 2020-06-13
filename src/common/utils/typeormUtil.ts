/**
* 返回sql(fieldName 为字段名称，value, index 为是否走索引)
*/
export const createFieldSql = (fieldName: string, value: any, index = false) => {
  let sqlStr = '';

  if (!value) {
    sqlStr = '1=1'
    return { sqlStr, value: { [fieldName]: value } };
  }

  if (index) {
    sqlStr = `${fieldName} = ${fieldName}`;
    return { sqlStr, value: { [fieldName]: `${value}` } };
  } else {
    sqlStr = `${fieldName} like :${fieldName}`;
    return { sqlStr, value: { [fieldName]: `%${value}%` } };
  }
}

/**
* 返回比较时间sql
*/
export const createCompareTimeSql = (startTime: Date, endTime: Date) => {
  let sqlStr = '';

  if (!startTime || !endTime) {
    sqlStr = '1=1'
    return { sqlStr, value: { startTime, endTime } };
  }

  sqlStr = `createTime BETWEEN :startTime AND :endTime`;
  return { sqlStr, value: { startTime, endTime } };
}