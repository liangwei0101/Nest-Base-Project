import { Controller, Get } from '@nestjs/common';
import { NoAuth } from '../../decorator/customize';

@Controller('health')
export class HealthCheckController {
  @Get()
  @NoAuth()
  async getHealthStatus() {
    return { tip: '我是服务器1' };
  }
}
