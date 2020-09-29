import { Balance } from '../../entity/balance/balance.entity';
import { UserConfig } from '../../entity/user/user.config.entity';
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { AccountBalancesDataLoader } from './balance.data-loader';
import { UserConfigDataLoader } from './user-config.data-loader';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Balance, UserConfig])],
  providers: [
    AccountBalancesDataLoader,
    UserConfigDataLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class DataLoaderModule {}
