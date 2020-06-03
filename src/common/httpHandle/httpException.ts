import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { CustomException } from './customException';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let errorResponse: any;
    const date = new Date().toLocaleDateString() + ' ' +new Date().toLocaleTimeString();

    if (exception instanceof CustomException) {
      // 自定义异常
      errorResponse = {
        data: { errorMessage: exception.getErrorMessage() },
        code: exception.getErrorCode(), // 错误code
        message: 'error',
        date: date,
        url: request.originalUrl, // 错误的url地址
      };
    } else {
      // 非自定义异常
      errorResponse = {
        data: {
          error: exception.message,
        },
        message: 'error',
        date: date,
        code: exception.getStatus(), // 错误code
        url: request.originalUrl, // 错误的url地址
      };
    }
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}