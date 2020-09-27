import { Controller, Get, Post, Request, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, SignUpStep1Dto } from './userDto';
import { NoAuth, CurrentUser, Roles } from '../../common/decorator/customize';
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
    console.log(user);
    return await this.userService.getOneUserInfo('5d89d2eb618cf9344e539d01');
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
  @NoAuth()
  @Post('/dto')
  // @ApiOperation({ description: '创建用户Dto' })
  async createTest(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return true;
  }

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

  //#region  新 API

  @NoAuth()
  @Post('/sign-up-step1')
  // @ApiOperation({ description: '注册第一步' })
  async signUpStep1(@Body() userDto: SignUpStep1Dto) {
    const user = new User();
    Object.assign(user, userDto);
    return this.userService.signUpStep1(user);
  }

  @Post('/sign-up-step2')
  // @ApiOperation({ description: '注册第二步(KYC系统已完成)' })
  async signUpStep2(@Body() user: User) {
    return this.userService.signUpStep2(user);
  }

  @Post('/sign-up-step3')
  // @ApiOperation({ description: '注册第二步(KYC系统已完成)' })
  async signUpStep3(@Body() user: User) {
    return this.userService.signUpStep3(user);
  }

  @Put()
  @Roles('admin')
  // @ApiResponse({ status: 200, type: User })
  // @ApiOperation({ description: '更新用户管理人' })
  async updateUserManageUserId(merchantsId: string, manageId: string) {
    return await this.userService.updateUserManageUserId(merchantsId, manageId);
  }

  //#endregion
}
