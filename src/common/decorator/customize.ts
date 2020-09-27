import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * 接口不用验证
 */
export const NoAuth = () => SetMetadata('no-auth', true);

/**
 * 登录认证
 */
export const LoginAuth = () => SetMetadata('login-auth', true);

/**
 * 某个角色能访问
 */
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

/**
 * 当前登录的User
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const restfulUser = request.user;
    const ctx = GqlExecutionContext.create(context);
    const graphqlUser = ctx.getContext().req.user;
    return restfulUser || graphqlUser;
  },
);
