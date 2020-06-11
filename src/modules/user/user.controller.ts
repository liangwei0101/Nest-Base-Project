import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './userDto';
import { Roles, CurrentUser } from '../../common/decorator/customize';
import { User } from '../../entity/user.entity';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  @ApiOperation({ description: '获取用户列表' })
  async userList() {
    // user 是当前登录的用户
    // console.log(user)
    return await this.userService.getUserList();
  }

  @Post('/test')
  @Roles('admin')
  @ApiOperation({ description: '只能是admin访问这个路由' })
  async adminUpdaeData() {
    return true;
  }

  @Post()
  @ApiOperation({ description: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
