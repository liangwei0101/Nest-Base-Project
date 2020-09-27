import { Page } from '../class/pagination/page';

/**
 * 列表和条数
 */
export interface IListAndPage<T> {
  data: T[];
  count: number;
  page: Page;
}
