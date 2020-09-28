import { SystemConfig } from '../../entity/configs/system.config.entity';
import { IPaginationResult, Pagination } from '../../common/class/pagination';
import { Field, ObjectType } from '@nestjs/graphql';
@ObjectType()
export class SystemConfigOutput extends Pagination<SystemConfig> {
  @Field(() => [SystemConfig])
  public data: SystemConfig[];
}
