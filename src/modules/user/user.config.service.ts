import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserConfig } from '../../entity/user/user.config.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserConfigService {
  constructor(@InjectRepository(UserConfig) private userConfigRepository: Repository<UserConfig>) {}

  /**
   * 查询用户配置表
   */
  public async findUserConfig() {
    this.userConfigRepository.findByIds(['121212']);
  }
}
