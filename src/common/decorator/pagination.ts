import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PaginationDto } from '../class/pagination';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * 分页装饰器
 */
export const Pagination = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const restfulRequest = context.switchToHttp().getRequest();
    const ctx = GqlExecutionContext.create(context);
    const graphqlRequest = ctx.getContext().req;
    return returnPagination(restfulRequest || graphqlRequest);
  },
);

/**
 * 返回分页对象
 */
function returnPagination(request: any) {
  const paginationDto = new PaginationDto();
  // 条数
  if (request.query.hasOwnProperty('limit')) {
    paginationDto.limit = request.query.limit;
  } else {
    paginationDto.limit = 10;
  }
  // 页数
  if (request.query.hasOwnProperty('page')) {
    paginationDto.page = request.query.page;
  } else {
    paginationDto.page = 0;
  }

  return paginationDto;
}
