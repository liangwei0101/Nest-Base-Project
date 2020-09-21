import { Controller, Get } from '@nestjs/common';
import { NoAuth } from '../../../common/decorator/customize';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('healthCheck')
@Controller('health')
export class HealthCheckController {

	@Get()
	@NoAuth()
	@ApiOperation({ description: '健康检查' })
	async getHealthStatus() {
		return;
	}
}
