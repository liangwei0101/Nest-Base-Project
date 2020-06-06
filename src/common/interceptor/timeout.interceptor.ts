import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

/**
* 您想要处理路线请求的超时。当您的端点在一段时间后没有返回任何内容时，
* 您希望以错误响应终止。以下结构可实现此目的
* 10s 超时
*/
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(timeout(10000));
  }
}