/**
 * 分页接口
 */
export interface IPaginationResult<T> {
  data: T[];
  total: number;
  pageTotal?: number;
  next?: string;
  previous?: string;
}
