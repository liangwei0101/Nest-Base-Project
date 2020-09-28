import { ObjectType, Field, InputType } from '@nestjs/graphql';
import graphqlTypeJson from 'graphql-type-json';
import { IQueryParams } from '../../../common/interface/IQueryParams';
import { PageInput } from './page.input';

@ObjectType()
@InputType({})
export class QueryParams implements IQueryParams {
  @Field(() => graphqlTypeJson, { nullable: true })
  filter?: JSON;

  @Field(() => graphqlTypeJson, { nullable: true })
  order?: JSON;

  @Field(() => PageInput, { nullable: true, defaultValue: { page: 0, limit: 10 } })
  pagination?: PageInput;
}
