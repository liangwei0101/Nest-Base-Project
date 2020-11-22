import { UserConfig } from '../../entity/user/user.config.entity';
import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderInterceptor } from 'nestjs-dataloader';
import { UserConfigDataLoader } from './user-config.data-loader';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserConfig])],
  providers: [
    UserConfigDataLoader,
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    },
  ],
})
export class DataLoaderModule {}
