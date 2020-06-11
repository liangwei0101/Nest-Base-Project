
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(account: string): Promise<any> {
    return await this.userService.findOneByAccount(account);
  }

  async login(account: string, password: string) {
    const payload = { account, password, role: 'admin' };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}