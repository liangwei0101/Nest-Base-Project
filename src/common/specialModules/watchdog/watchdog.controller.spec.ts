import { Test, TestingModule } from '@nestjs/testing';
import { WatchdogController } from './watchdog.controller';

describe('Watchdog Controller', () => {
  let controller: WatchdogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WatchdogController],
    }).compile();

    controller = module.get<WatchdogController>(WatchdogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
