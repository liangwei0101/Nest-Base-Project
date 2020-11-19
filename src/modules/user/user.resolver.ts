import { UserService } from './user.service';
import { User } from '../../entity/user/user.entity';
import { Args, Query, Resolver, Mutation, Parent, ResolveField } from '@nestjs/graphql';
import { UserInput } from './userDto';
import { GraphQLJSONObject } from 'graphql-type-json';
import { QueryParams } from '../../common/class/graphql/query.param';
import { UserConfig } from 'src/entity/user/user.config.entity';
import { Loader } from 'nestjs-dataloader';
import DataLoader from 'dataloader';
import { UserConfigDataLoader } from '../data-loader/user-config.data-loader';
import { NoAuth } from '../../common/decorator/customize';


@Resolver(User)
// @UseGuards(GqlRolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //#region Query

  @NoAuth()
  @Query(() => [User], { description: '查询用户列表' })
  async users(@Args('queryParams') { filter, order, pagination }: QueryParams) {
    const res = await this.userService.getUserList({ pagination, filter, order });
    return res.data;
  }

  //#region 子域查询

  /**
   * 获取用户配置
   */
  // @ResolveField()
  // async userConfig(@Parent() user: User, @Loader(UserConfigDataLoader.name) dataLoader: DataLoader<string, UserConfig>) {
  //   return await dataLoader.load(user.id);
  // }

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
