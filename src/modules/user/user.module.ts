import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../entity/user/user.entity';
import { Balance } from '../../entity/balance/balance.entity';
import { UserExtend } from '../../entity/user/user.extend.entity';
import { UserConfig } from '../../entity/user/user.config.entity';
import { UserCoupon } from '../../entity/coupon/coupon.entity';
import { BalanceModule } from '../balance/balance.module';
import { UserResolver } from './user.resolver';
import { InviteCodeModule } from '../invite-code/invite-code.module';
import { UserConfigDataLoader } from './dataLoader/userConfig.dataLoader';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from 'nestjs-dataloader';

@Module({
  imports: [BalanceModule, InviteCodeModule, TypeOrmModule.forFeature([User, Balance, UserExtend, UserConfig, UserCoupon])],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    UserConfigDataLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
  exports: [UserService],
})
export class UserModule {}
