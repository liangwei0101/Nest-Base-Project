/**
* 分页接口
*/
export interface IPagination {
  // 条数
  limit: number;
  // 页数
  page: number;
}

/**
* 分页传输对象
*/
export class PaginationDto implements IPagination {

  limit: number;

  page: number;
}