import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/globalGuard/roles.guard';
import { GlobalAuthGuard } from './common/globalGuard/auth.guard';
import { AuthModule } from './common/specialModules/auth/auth.module';
import { DatabaseModule } from './common/specialModules/database/database.module';
import { HealthCheckModule } from './common/specialModules/healthCheck/healthCheck.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    HealthCheckModule
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
