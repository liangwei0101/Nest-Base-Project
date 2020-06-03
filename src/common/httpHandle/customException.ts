import { HttpException, HttpStatus } from "@nestjs/common";
import { ApiErrorCode } from "../enum/apiErrorCode";

export class CustomException extends HttpException {

  private errorMessage: string;
  private errorCode: ApiErrorCode;

  constructor(errorMessage: string, errorCode: ApiErrorCode, statusCode: HttpStatus = HttpStatus.BAD_REQUEST) {

    super(errorMessage, statusCode);

    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  getErrorCode(): ApiErrorCode {
    return this.errorCode;
  }

  getErrorMessage(): string {
    return this.errorMessage;
  }
}