import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CustomException } from './customException';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('=======================================1111')
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let errorResponse: any;

    console.log("====================11=====" + (exception instanceof CustomException))
    if (exception instanceof CustomException) {
      // 自定义异常
      errorResponse = {
        data: {
          error: exception.message,
        },
        message: 'error',
        date: new Date().toLocaleDateString(),
        code: exception.getErrorCode(), // 错误code
        url: request.originalUrl, // 错误的url地址
      };
    } else {
      // 非自定义异常
      errorResponse = {
        data: {
          error: exception.message,
        },
        message: 'error',
        date: new Date().toLocaleDateString(),
        code: exception.getStatus(), // 错误code
        url: request.originalUrl, // 错误的url地址
      };
    }
    console.log('====================================12122120000000')
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    response.send(errorResponse);
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
  }
}