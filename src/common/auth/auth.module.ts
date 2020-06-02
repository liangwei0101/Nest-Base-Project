import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/modules/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '24h' },
    })],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService,
    PassportModule,
    JwtModule]
})
export class AuthModule { }
