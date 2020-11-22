import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../../entity/user/user.entity';
import { UserResolver } from './user.resolver';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    UserResolver,
  ],
  exports: [UserService],
})
export class UserModule {}
