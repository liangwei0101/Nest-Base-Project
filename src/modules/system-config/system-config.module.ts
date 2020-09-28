import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemConfig } from '../../entity/configs/system.config.entity';
import { SystemConfigResolver } from './system-config.resolver';
import { SystemConfigService } from './system-config.service';

@Module({
  imports: [TypeOrmModule.forFeature([SystemConfig])],
  providers: [SystemConfigService, SystemConfigResolver],
  exports: [SystemConfigService],
})
export class SystemConfigModule {}
