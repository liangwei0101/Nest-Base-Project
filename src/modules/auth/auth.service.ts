import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entity/user.entity';

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
      const { password, ...result } = user;
      return result;
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
