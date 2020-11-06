import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { User } from '../../entity/user/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // 无角色注解时，api任何角色都能访问
    if (!roles) {
      return true;
    }

    let user: User;
    const restfulRequest = context.switchToHttp().getRequest();
    const ctx = GqlExecutionContext.create(context);
    const graphqlRequest = ctx.getContext().req;
    if (restfulRequest) {
      // restful
      user = restfulRequest.user;
    } else if (graphqlRequest) {
      // graphql
      user = graphqlRequest.user;
    }

    const hasRole = () => user.rolesList.some((role: string) => roles.indexOf(role) > -1);

    return user && user.rolesList && hasRole();
  }
}
