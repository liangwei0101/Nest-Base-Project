import { PageInput } from '../class/graphql/page.input';

/**
 * 通用查询接口
 */
export interface IQueryParams {
  filter?: object;

  order?: object;

  pagination?: PageInput;
}


