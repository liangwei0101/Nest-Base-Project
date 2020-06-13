
import { IPaginationResult } from './IPaginationResults';

/**
* 分页类
*/
export class Pagination<T> {
  public results: T[];
  public page_total: number;
  public total: number;

  constructor(paginationResults: IPaginationResult<T>) {
    this.results = paginationResults.results;
    this.page_total = paginationResults.results.length;
    this.total = paginationResults.total;
  }
}