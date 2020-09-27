import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../../modules/user/user.service';
import { RoleService } from '../../../modules/iam/role/role.service';
import { User } from '../../../entity/user/user.entity';
import { LoginDto } from '../../../modules/user/userDto';

@Injectable()
export class AuthService {
  constructor(private readonly roleService: RoleService, private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUserAccount(account: string) {
    const user = await this.userService.findOneByAccount(account);
    const role = await this.roleService.findUserRoleByPhoneEmail(account);
    user.rolesList.push(role.name);
    const results = { user, role };
    return results;
  }

  async validateUserAccountAndPasswd(account: string, pwd: string): Promise<any> {
    return this.userService.findOneByAccountAndPasswd(account, pwd);
  }

  async signJwt(user: User, loginDto: LoginDto) {
    const role = await this.roleService.findUserTypeByUserId(user.id); //管理员，销售，渠道，
    const payload = { id: user.id, account: loginDto.account, role: role.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
