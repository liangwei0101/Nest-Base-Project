import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../modules/user/userDto';
import { NoAuth } from '../decorator/customize';
import { LocalAuthGuard } from './guards/auth.local.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@UseGuards(AuthGuard('local'))
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    console.log('========================登录')
    return this.authService.login(loginDto.account, loginDto.password);
  }

}
