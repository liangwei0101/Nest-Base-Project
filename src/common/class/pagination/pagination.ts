import { Field, ObjectType } from '@nestjs/graphql';
import { IPaginationResult } from './IPaginationResults';

/**
 * 分页类
 */
@ObjectType()
export class Pagination<T> {
  public data: T[];

  @Field({ nullable: true, description: 'pageTotal' })
  public pageTotal: number;

  @Field({ nullable: true, description: 'total' })
  public total: number;

  constructor(paginationResults: IPaginationResult<T>) {
    this.data = paginationResults.data;
    this.pageTotal = paginationResults.data.length;
    this.total = paginationResults.total;
  }
}
