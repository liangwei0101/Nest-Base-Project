import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import customConfig from './config/index';
import { AuthModule } from './common/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleAuthGuard } from './common/globalGuard/roleAuthGuard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 作用于全局
      load: [customConfig], // 加载自定义配置项
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // 数据库配置项依赖于ConfigModule，需在此引入
      useFactory: (configService: ConfigService) => configService.get('DATABASE_CONFIG'),
      inject: [ConfigService], // 记得注入服务，不然useFactory函数中获取不到ConfigService
    }),
    UserModule,
    AuthModule
  ],
  providers: [
    {
      // 设置全局守卫，useClass为自定义的Guard
      provide: APP_GUARD,
      useClass: RoleAuthGuard,
    },
  ]
})
export class AppModule { }
