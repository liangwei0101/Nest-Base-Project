import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../../modules/user/userDto';
import { LoginAuth, CurrentUser } from '../../decorator/customize';
import { User } from '../../../entity/user/user.entity';
import { LocalAuthGuard } from './guards/auth.local.guard';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@CurrentUser() user: User, @Body() loginDto: LoginDto) {
    return this.authService.signJwt(user, loginDto);
  }

  @Get('/jwt')
  @UseGuards(JwtAuthGuard)
  async verificationJwt() {
    return true;
  }
}
