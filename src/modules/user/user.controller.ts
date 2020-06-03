import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './userDto';
import { User } from './user.entity';
import { AuthService } from 'src/common/auth/auth.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly authService: AuthService
  ) { }

  @Get()
  @ApiOperation({ description: '获取用户列表' })
  async userList() {
    return await this.userService.getUserList();
  }

  @Post()
  @ApiOperation({ description: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }

  @Post('/login')
  @ApiOperation({ description: '用户登录' })
  async login(@Body() loginParams: User) {
    // return this.authService.validateUser(loginParams.account, loginParams.password);
  }
}
