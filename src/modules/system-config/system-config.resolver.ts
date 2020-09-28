import { Args, Query, Resolver } from '@nestjs/graphql';
import { QueryParams } from '../../common/class/graphql/query.param';
import { SystemConfig } from '../../entity/configs/system.config.entity';
import { SystemConfigOutput } from './system-config.Dto';
import { SystemConfigService } from './system-config.service';

@Resolver(SystemConfig)
// @UseGuards(GqlRolesGuard)
export class SystemConfigResolver {
  constructor(private readonly systemConfigService: SystemConfigService) {}

  @Query(() => SystemConfigOutput, { description: '查询用户可见配置表数据' })
  async systemConfigs(@Args('queryParams') { filter, order, pagination }: QueryParams) {
    return await this.systemConfigService.systemConfigList({ filter, order, pagination });
  }
}
