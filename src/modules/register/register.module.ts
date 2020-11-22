import { Global, Module } from '@nestjs/common';
import { registerEnumType } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeeEnum } from '../../common/enum/common.enum';
import { UserConfig } from '../../entity/user/user.config.entity';
import { User } from '../../entity/user/user.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserConfig,
    ]),
  ],
  exports: [TypeOrmModule],
})
export class RegisterModule {
  constructor() {
    registerEnumType(FeeEnum, { name: 'FeeEnum' });
  }
}
