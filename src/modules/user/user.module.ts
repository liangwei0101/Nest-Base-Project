import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../entity/user/user.entity';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
    // UserConfigDataLoader,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DataLoaderInterceptor,
    // },
  ],
  exports: [UserService],
})
export class UserModule {}
