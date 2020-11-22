import { UserService } from './user.service';
import { User } from '../../entity/user/user.entity';
import { Args, Query, Resolver, Mutation, Parent, ResolveField } from '@nestjs/graphql';
import { UserInput, UsersOutput } from './userDto';
import { QueryParams } from '../../common/class/graphql/query.param';
import { UserConfig } from 'src/entity/user/user.config.entity';
import { Loader } from 'nestjs-dataloader';
import DataLoader from 'dataloader';
import { UserConfigDataLoader } from '../data-loader/user-config.data-loader';
import { NoAuth } from '../../common/decorator/customize';
import { generalList } from '../../common/utils/typeormUtil';


@Resolver(User)
// @UseGuards(GqlRolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  //#region Query

  @NoAuth()
  @Query(() => UsersOutput, { description: '查询用户列表' })
  async users(@Args('queryParams') queryParams: QueryParams) {
    return await generalList<User>(User, 'user', queryParams, {});
  }

  //#region 子域查询

  /**
   * 获取用户配置
   */
  @ResolveField()
  async userConfig(@Parent() user: User, @Loader(UserConfigDataLoader.name) dataLoader: DataLoader<string, UserConfig>) {
    return await dataLoader.load(user.id);
  }

  //#endregion

  //#endregion

  //#region Mutation

  @Mutation(() => User, { description: '我是备注' })
  async createUser() {
    return this.userService.getUserList(null);
  }

  @Mutation(() => User, { description: '更新用户部分字段' })
  async user(@Args('data') user: UserInput) {
    return this.userService.updateUserInfo(user);
  }
  //#endregion
}
