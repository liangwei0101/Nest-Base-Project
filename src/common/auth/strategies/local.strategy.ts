import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { CustomException } from '../../../common/httpHandle/customException';
import { ApiErrorMessage } from '../../../common/enum/apiErrorCode';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    console.log("验证有了")
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new CustomException(
        ApiErrorMessage.USER_IS_NOT_EXIST,
        ApiErrorMessage.USER_IS_NOT_EXIST_CODE,
      );
    } else if (user && user.password !== password) {
      throw new CustomException(
        ApiErrorMessage.USER_PASSWD_IS_ERROR,
        ApiErrorMessage.USER_PASSWD_IS_ERROR_CODE,
      );
    }
    return user;
  }
}