import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../modules/user/user.service';
import { User } from '../../../entity/user/user.entity';
import { LoginDto } from '../../../modules/user/userDto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUserAccount(account: string) {
    const user = await this.userService.findOneByAccount(account);
    const role = '我是角色'
    user.rolesList.push(role);
    const results = { user, role };
    return results;
  }

  async validateUserAccountAndPasswd(account: string, pwd: string): Promise<any> {
    return this.userService.findOneByAccountAndPasswd(account, pwd);
  }

  async signJwt(user: User, loginDto: LoginDto) {
    const payload = { id: user.id, account: loginDto.account, role: '我是角色' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
