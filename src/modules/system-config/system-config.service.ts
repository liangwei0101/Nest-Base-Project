import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemConfig } from '../../entity/configs/system.config.entity';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { orderParamsHandle, timeParamsHandle, generalList } from '../../common/utils/typeormUtil';
import { Pagination } from '../../common/class/pagination';
import { IQueryParams } from '../../common/interface/IQueryParams';

@Injectable()
export class SystemConfigService {
  constructor(@InjectRepository(SystemConfig) private systemConfigRep: Repository<SystemConfig>) {}

  /**
   * 系统配置列表（用户可见）
   */
  public async systemConfigList(queryParams: IQueryParams) {
    // visibleToUser 只开放给用户的字段才能查询
    const condition: FindConditions<SystemConfig> = { visibleToUser: true };
    const res = await generalList<SystemConfig>(SystemConfig, 'systemConfig', queryParams, condition);
    return res;
  }
}
