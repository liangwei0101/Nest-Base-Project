import { Module } from '@nestjs/common';
import { WatchdogController } from './watchdog.controller';

@Module({
  controllers: [WatchdogController]
})
export class WatchdogModule {}
