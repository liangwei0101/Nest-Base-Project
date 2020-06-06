import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../entity/user.entity';
import { ApiErrorMessage } from '../enum/apiErrorCode';
import { CustomException } from '../../common/httpHandle/customException';

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
      const { ...userIno } = user;
      return { userIno, accessToken: this.createJWT(user) };
    } else if (!user) {
      throw new CustomException(
        ApiErrorMessage.USER_IS_NOT_EXIST,
        ApiErrorMessage.USER_IS_NOT_EXIST_CODE,
      );
    } else if (user && user.password !== pass) {
      throw new CustomException(
        ApiErrorMessage.USER_PASSWD_IS_ERROR,
        ApiErrorMessage.USER_PASSWD_IS_ERROR_CODE,
      );
    } else {
      throw new UnauthorizedException();
    }
  }

  /**
   * 验证用户
   */
  async validateUser1(payload: any): Promise<User> {
    console.log(payload);
    const user = new User();
    return user;
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
