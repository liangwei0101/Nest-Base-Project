import { Controller, Get, Post, Request, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { CreateUserDto } from './userDto';
import { Roles, CurrentUser, NoAuth } from '../../common/decorator/customize';
import { User } from '../../entity/user.entity';
import { Paginations } from '../../common/decorator/pagination';
import { IPagination } from '../../common/specialModules/pagination';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Get()
  @NoAuth()
  @ApiOperation({ description: '获取用户列表' })
  async userList(@Paginations() paginationDto: IPagination) {
    return await this.userService.getUserList(paginationDto);
  }

  @Post('/test')
  @Roles('admin')
  @ApiOperation({ description: '只能是admin访问这个路由' })
  async adminUpdaeData() {
    return true;
  }

  @Post()
  @NoAuth()
  @ApiOperation({ description: '创建用户' })
  async create(@Body() userDto: CreateUserDto) {
    console.log(userDto);
    return await this.userService.createUser();
  }
}
