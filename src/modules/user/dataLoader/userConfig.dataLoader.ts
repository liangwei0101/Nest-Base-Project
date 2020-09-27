import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { UserConfig } from '../../../entity/user/user.config.entity';
import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserConfigDataLoader implements NestDataLoader<string, UserConfig> {
  constructor(@InjectRepository(UserConfig) private userConfigRepository: Repository<UserConfig>) {}

  generateDataLoader(): DataLoader<string, UserConfig> {
    return new DataLoader<string, UserConfig>(async (keys: string[]) => {
      const loadedEntities = await this.userConfigRepository.find({ userId: In(keys) });
      return keys.map(key => loadedEntities.find(entity => entity.userId === key));
    });
  }
}
