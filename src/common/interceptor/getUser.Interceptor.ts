import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common"
import { AuthService } from "../specialModules/auth/auth.service"

/**
* 设置已登录用户在 request 中
*/
// @Injectable()
// export class GetUserInterceptor implements NestInterceptor {
//   constructor(private readonly authService: AuthService) {
//   }

//   async intercept(context: ExecutionContext, next: CallHandler) {
//     const request = context.switchToHttp().getRequest()
//     // const item = await this.authService.validateUser1();
//     request.user = item
//     return next.handle()
//   }
// }
