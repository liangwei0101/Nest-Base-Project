import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { NoAuth, CurrentUser } from '../../common/decorator/customize';
import { User } from '../../entity/user/user.entity';
import { Pagination } from '../../common/decorator/pagination';
import { IPagination } from '../../common/class/pagination';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @NoAuth()
  @Get('/list')
  //@ApiResponse({ status: 200, type: [User] })
  //@ApiOperation({ description: '获取用户列表' })
  async userList(@Pagination() paginationDto: IPagination, filter: any = {}) {
    return null;
  }

  @Get('/info')
  //@ApiResponse({ status: 200, type: User })
  //@ApiOperation({ description: '获取用户信息' })
  async getUserInfo(@CurrentUser() user: User) {
    return null;
  }

  @Post('/test')
  // @ApiOperation({ description: '只能是admin访问这个路由' })
  async adminUpdateData() {
    return true;
  }

  @Post()
  @NoAuth()
  // @ApiResponse({ status: 200, type: User })
  // @ApiOperation({ description: '创建用户' })
  async newUser() {
    return await this.userService.createNewUser();
  }

  //   @Post()
  //   @NoAuth()
  //   @ApiOperation({ description: '创建用户' })
  //   async create() {
  //     return await this.userService.createUser();
  //   }

  /**
   * 创建充值订单
   */
  @NoAuth()
  @Post()
  // @ApiOperation({ description: '创建用户-信息' })
  async createUser(@Body() paramsList: any) {
    for (const params of paramsList) {
      this.userService.createUserForRe(params);
    }
    return true;
  }
}
