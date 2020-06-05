import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // 无角色注释时，api任务权限都能访问
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const hasRole = () => user.roles.some((role: string) => roles.indexOf(role) > -1);
    console.log('hasRole', hasRole);

    return user && user.roles && hasRole();
  }
}
