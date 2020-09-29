import * as DataLoader from 'dataloader';
import { NestDataLoader } from 'nestjs-dataloader';
import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Balance } from '../../entity/balance/balance.entity';

@Injectable()
export class AccountBalancesDataLoader implements NestDataLoader<string, Balance[]> {
  constructor(@InjectRepository(Balance) private balanceRepository: Repository<Balance>) {}

  generateDataLoader(): DataLoader<string, Balance[]> {
    return new DataLoader<string, Balance[]>(async (keys: string[]) => {
      const loadedEntities = await this.balanceRepository.find({ accountId: In(keys) });
      return keys.map(key => loadedEntities.filter(entity => entity.accountId === key));
    });
  }
}
