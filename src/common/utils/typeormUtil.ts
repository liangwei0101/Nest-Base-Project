import { Equal, Like, Between, OrderByCondition, createQueryBuilder, FindConditions } from 'typeorm';
import { Pagination } from '../class/pagination';
import { IQueryParams } from '../interface/IQueryParams';

// /**
//  * 返回sql(fieldName 为字段名称，value, index 为是否走索引)
//  */
// export const createFieldSql = (fieldName: string, value: any, index = false) => {
//   let sqlStr = '';

//   if (!value) {
//     sqlStr = '1=1';
//     return { sqlStr, value: { [fieldName]: value } };
//   }

//   if (index) {
//     sqlStr = `${fieldName} = ${fieldName}`;
//     return { sqlStr, value: { [fieldName]: `${value}` } };
//   } else {
//     sqlStr = `${fieldName} like :${fieldName}`;
//     return { sqlStr, value: { [fieldName]: `%${value}%` } };
//   }
// };

// /**
//  * 返回比较时间sql
//  */
// export const createCompareTimeSql = (startTime: Date, endTime: Date) => {
//   let sqlStr = '';

//   if (!startTime || !endTime) {
//     sqlStr = '1=1';
//     return { sqlStr, value: { startTime, endTime } };
//   }

//   sqlStr = `createTime BETWEEN :startTime AND :endTime`;
//   return { sqlStr, value: { startTime, endTime } };
// };

// /**
//  * 全等于的字段
//  */
// export const equalParamsHandle = (options = {}, equalFiledParams: any) => {
//   for (const key in equalFiledParams) {
//     if (equalFiledParams[key]) {
//       options[key] = Equal(equalFiledParams[key]);
//     }
//   }
// };

// /**
//  * like的字段
//  */
// export const likeParamsHandle = (options = {}, likeFiledParams: any) => {
//   for (const key in likeFiledParams) {
//     if (likeFiledParams[key]) {
//       options[key] = Like(`%${likeFiledParams[key]}%`);
//     }
//   }
// };

/**
 * 时间参数
 */
export const timeParamsHandle = (options: any = {}, filter: any) => {
  if (filter && filter.createTime && filter.createTime.length === 2) {
    options.createTime = Between(filter.createTime[0], filter.createTime[1]);
  }
  if (filter && filter.updateTime && filter.updateTime.length === 2) {
    options.updateTime = Between(filter.updateTime[0], filter.updateTime[1]);
  }
  Object.assign(options, filter);
};

/**
 * 排序参数处理
 */
export const orderParamsHandle = (tableAliasName: string, params: any) => {
  const orderByCondition: OrderByCondition = {};
  for (const key in params) {
    const element = params[key];
    if (element === 1) {
      orderByCondition[`${tableAliasName}.${key}`] = 'ASC';
    } else {
      orderByCondition[`${tableAliasName}.${key}`] = 'DESC';
    }
  }

  orderByCondition[`${tableAliasName}.createTime`] = 'DESC';
  return orderByCondition;
};

// /**
//  * 通用查询条件
//  */
// export function commonQueryCondition(params: any) {
//   const optionParams = {};

//   // 时间处理
//   timeParamsHandle(optionParams, params.filter);

//   return optionParams;
// }

/**
 * 通用Query查询接口
 * @param T 实体表 class
 * @param talbeName 表名称
 * @param queryParams 前端传递参数
 * @param customCondition 自定义条件
 */
export const generalList = async <T>(T: any, talbeName: string, queryParams: IQueryParams, customCondition: FindConditions<T>) => {
  // 时间参数处理
  timeParamsHandle(customCondition, queryParams.filter);
  // 排序参数处理
  const orderByCondition = orderParamsHandle(talbeName, queryParams.order);

  const [data, total] = await createQueryBuilder<T>(T, talbeName)
    .skip(queryParams.pagination.page)
    .take(queryParams.pagination.limit)
    .where(customCondition)
    .orderBy(orderByCondition)
    .getManyAndCount();
  return new Pagination<T>({ data, total });
};
