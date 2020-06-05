import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './userDto';
import { AuthService } from '../../common/auth/auth.service';
import { User } from '../../entity/user.entity';
import { NoAuth, Roles } from 'src/common/decorator/customize';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Get()
  @ApiOperation({ description: '获取用户列表' })
  async userList() {
    return await this.userService.getUserList();
  }

  @Post('/update')
  @Roles('admin')
  @ApiOperation({ description: '只能是admin做这个事情' })
  async adminUpdaeData() {
    return true;
  }

  @Post()
  @ApiOperation({ description: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @NoAuth()
  @Post('/login')
  @ApiOperation({ description: '用户登录' })
  async login(@Body() loginParams: User) {
    return this.authService.validateUser(loginParams.account, loginParams.password);
  }
}
