import { UserService } from './user.service';
import { User } from '../../entity/user/user.entity';
import { Args, Query, Resolver, Mutation, Int, ResolveProperty, Parent, ResolveField } from '@nestjs/graphql';
import { Pagination } from '../../common/decorator/pagination';
import { IPagination } from '../../common/class/pagination';
import { GqlRolesGuard } from '../../common/special-modules/auth/guards/gql.roles.guard';
import { UseGuards } from '@nestjs/common';
import { UserInput } from './userDto';
import { GraphQLJSONObject } from 'graphql-type-json';
import { QueryParams } from '../../common/class/graphql/query.param';
import { UserConfig } from 'src/entity/user/user.config.entity';
import { UserConfigDataLoader } from './dataLoader/userConfig.dataLoader';
import { Loader } from 'nestjs-dataloader';
import DataLoader from 'dataloader';

@Resolver(User)
// @UseGuards(GqlRolesGuard)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //#region Query

  @Query(() => [User], { description: '查询用户列表' })
  async users(@Args('queryParams') { filter, order, pagination }: QueryParams) {
    return await this.userService.getUserList({ pagination, filter, order });
  }

  // @Query(() => Int, { description: '查询用户列表条数' })
  // async userListCount(@Args('queryParams') { filter }: QueryParams) {
  //   return await this.userService.getUserListCount(filter);
  // }

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
