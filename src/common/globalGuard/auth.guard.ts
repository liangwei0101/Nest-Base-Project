import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { LocalAuthGuard } from '../auth/guards/auth.local.guard';

@Injectable()
export class GlobalAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // 在这里取metadata中的no-auth，得到的会是一个bool
    console.log('------------全局验证守卫-------------------')
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
    const guard = GlobalAuthGuard.getAuthGuard(noAuth);
    // 执行所选策略Guard的canActivate方法
    return guard.canActivate(context);
  }

  // 根据NoAuth的t/f选择合适的策略Guard
  private static getAuthGuard(noAuth: boolean): IAuthGuard {
    if (noAuth) {
      return new LocalAuthGuard();
    } else {
      return new JwtAuthGuard();
    }
  }
}