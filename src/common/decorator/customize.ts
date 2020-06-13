import { SetMetadata, createParamDecorator, ExecutionContext } from '@nestjs/common'

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
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

