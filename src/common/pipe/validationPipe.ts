import { ArgumentMetadata, Injectable, PipeTransform, HttpStatus } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { CustomException } from '../httpHandle/customException';

@Injectable()
export class ValidationPipeConfig implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const errorMessageList = []
      const errorsObj = errors[0].constraints
      for (const key in errorsObj) {
        if (errorsObj.hasOwnProperty(key)) {
          errorMessageList.push(errorsObj[key])
        }
      }
      throw new CustomException(errorMessageList, HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}