import { InputType, ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, Min, IsInt } from 'class-validator';
import { IPagination } from '../pagination';

@ArgsType()
@InputType()
export class PageInput implements IPagination {
  @Min(0)
  @IsInt()
  @Field({ description: '页', defaultValue: 0, nullable: true })
  page: number;

  @Min(1)
  @IsInt()
  @Field({ description: '条数', defaultValue: 10, nullable: true })
  limit: number;
}
