import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../../modules/user/userDto';
import { NoAuth } from '../decorator/customize';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @NoAuth()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.account, loginDto.password);
  }

}
