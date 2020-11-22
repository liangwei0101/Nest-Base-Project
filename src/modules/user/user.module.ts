import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
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
