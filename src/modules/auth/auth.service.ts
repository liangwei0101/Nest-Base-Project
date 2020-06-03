import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entity/user.entity';
import { ApiErrorCode, ApiErrorMessage } from '../../common/enum/apiErrorCode';
import { CustomException } from 'src/common/httpHandle/customException';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  /**
  * 验证用户
  */
  async validateUser(account: string, pass: string) {
    const user = await this.userService.findOneByAccount(account);
    if (user && user.password === pass) {
      const { password, ...userIno } = user;
      return { userIno, access_token: this.createJWT(user) };
    } else if (!user) {
      throw new CustomException(ApiErrorMessage.USER_IS_NOT_EXIST, ApiErrorCode.USER_IS_NOT_EXIST);;
    } else if (user && user.password !== pass) {
      console.log('=====================')
      throw new CustomException(ApiErrorMessage.USER_PASSWD_IS_ERROR, ApiErrorCode.USER_PASSWD_IS_ERROR);;
    }
    throw new UnauthorizedException();
  }

  /**
  * 创建jwt
  */
  createJWT(user: User) {
    const payload = { userId: user.id, account: user.account };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
