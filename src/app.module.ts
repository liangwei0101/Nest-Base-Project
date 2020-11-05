import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import GraphQLJSON from 'graphql-type-json';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import { RolesGuard } from './common/globalGuard/roles.guard';
import { DatabaseModule } from './common/special-modules/database/database.module';
import { HealthCheckModule } from './common/special-modules/health-check/healthCheck.module';
import { RedisModule } from './common/special-modules/redis/redis.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      resolvers: { JSON: GraphQLJSON },
    }),
    UserModule,
    RedisModule,
    DatabaseModule,
    HealthCheckModule,
  ],
  providers: [
    // {
    //   // 设置全局守卫
    //   provide: APP_GUARD,
    //   useClass: GraphqlGuard,
    // },
    {
      // 设置全局角色守卫
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [],
})
export class AppModule {}
