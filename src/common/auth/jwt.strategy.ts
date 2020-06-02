// src/logical/auth/jwt.strategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: (configService: ConfigService) => configService.get('jwtSecret'),
    });
  }

  /**
  * JWT验证
  */
  async validate(payload: any) {
    console.log(`JWT验证 - Step 4: 被守卫调用`);
    return await this.authService.validateUser(payload.account, payload.pass);
  }
}
