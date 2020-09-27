import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';
import GraphQLJSON from 'graphql-type-json';
import { RolesGuard } from './common/globalGuard/roles.guard';
import { DatabaseModule } from './common/special-modules/database/database.module';
import { HealthCheckModule } from './common/special-modules/health-check/healthCheck.module';
import { RedisModule } from './common/special-modules/redis/redis.module';
import { AccountPolicyRelationModule } from './modules/iam/account-policy-relation/account-policy-relation.module';
import { PolicyModule } from './modules/iam/policy/policy.module';
import { RolePolicyRelationModule } from './modules/iam/role-policy-relation/role-policy-relation.module';
import { RoleModule } from './modules/iam/role/role.module';
import { InviteCodeModule } from './modules/invite-code/invite-code.module';
import { NoticeModule } from './modules/notice/notice.module';
import { QbitCardModule } from './modules/qbitCard/qbit-card/qbit-card.module';
import { SystemConfigModule } from './modules/system-config/system-config.module';
import { FxRatesModule } from './modules/fx-rates/fx-rates.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      resolvers: { JSON: GraphQLJSON },
    }),
    QbitCardModule,
    UserModule,
    RedisModule,
    DatabaseModule,
    HealthCheckModule,
    NoticeModule,
    InviteCodeModule,
    SystemConfigModule,
    PolicyModule,
    RoleModule,
    RolePolicyRelationModule,
    FxRatesModule,
    AccountPolicyRelationModule,
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
