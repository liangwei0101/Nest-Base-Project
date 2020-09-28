import { Module } from '@nestjs/common';
import { HealthCheckController } from './healthCheck.controller';

@Module({
	controllers: [HealthCheckController]
})
export class HealthCheckModule { }
