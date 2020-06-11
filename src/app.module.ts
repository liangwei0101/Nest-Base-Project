import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import customConfig from './config/index';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/globalGuard/roles.guard';
import { GlobalAuthGuard } from './common/globalGuard/auth.guard';
import { AuthModule } from './common/specialModules/auth/auth.module';

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
      // 设置全局守卫
      provide: APP_GUARD,
      useClass: GlobalAuthGuard,
    },
    {
      // 设置全局角色守卫
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ]
})
export class AppModule { }
