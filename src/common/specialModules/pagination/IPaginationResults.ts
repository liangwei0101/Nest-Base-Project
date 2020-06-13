
/**
* 分页接口
*/
export interface IPaginationResult<T> {
  results: T[];
  total: number;
  next?: string;
  previous?: string;
}