import { HttpException, HttpStatus } from "@nestjs/common";

/**
* 自定义异常
*/
export class CustomException extends HttpException {

  private errorMessage: any;
  private errorCode: number;

  constructor(errorMessage: any, errorCode: number, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {

    super(errorMessage, statusCode);

    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): number {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}