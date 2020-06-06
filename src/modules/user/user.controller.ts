import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './userDto';
import { Roles } from '../../common/decorator/customize';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../common/auth/guards/jwt.auth.guard';

@ApiTags('user')
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  @ApiOperation({ description: '获取用户列表' })
  async userList() {
    return await this.userService.getUserList();
  }

  @Post('/test')
  // @Roles('admin')
  @ApiOperation({ description: '只能是admin做这个事情' })
  async adminUpdaeData() {
    return true;
  }

  @Post()
  @ApiOperation({ description: '创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createUser(createUserDto);
  }
}
