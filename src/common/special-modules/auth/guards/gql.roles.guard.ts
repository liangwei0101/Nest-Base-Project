import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlRolesGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (!(await super.canActivate(context))) return false;
    } catch (err) {
      throw err;
    }

    // 获取roles元数据，roles与roles.decorator.ts中SetMetadata()第一个参数一致
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      // 未被装饰器装饰，直接放行
      return true;
    }
    const req = this.getRequest(context);
    const user = req.user;
    const hasRole = () => user.roles.some((role: any) => roles.includes(role));
    return user && user.roles && hasRole();
  }
}
