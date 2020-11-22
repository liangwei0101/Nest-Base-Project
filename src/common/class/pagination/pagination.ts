import { Field, ObjectType } from '@nestjs/graphql';
import { IPaginationResult } from './IPaginationResults';

/**
 * 分页类
 */
@ObjectType()
export class Pagination<T> {
  public data: T[];

  @Field({ nullable: true, description: '当前数据条数' })
  public pageTotal: number;

  @Field({ nullable: true, description: '总条数' })
  public total: number;

  constructor(paginationResults: IPaginationResult<T>) {
    this.data = paginationResults.data;
    this.pageTotal = paginationResults.data.length;
    this.total = paginationResults.total;
  }
}
