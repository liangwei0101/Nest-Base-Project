import { CacheModule, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { retry } from 'rxjs/operators';
import { DatabaseModule } from '../database/database.module';

describe('RedisService', () => {
  let service: RedisService;
  let app: INestApplication;
  const key = '123';
  const value = '456';

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        CacheModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => configService.get('redis'),
          inject: [ConfigService],
        }),
      ],
      providers: [RedisService],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    service = module.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await service.disConnect();
    await app.close();
  });

  describe('RedisService', () => {
    it('setValueAndKey', async () => {
      await service.setValueAndKey(key, value, 3600);
      const getValue = await service.get(key);
      expect(value).toEqual(getValue);
    });

    it('deleteValueByKey', async () => {
      const res = await service.deleteValueByKey(key);
      expect(res).toEqual(true);
    });

    it('setValueAndKey', async () => {
      const getValue1 = await service.setValueAndKey(key, value, 3600);
      expect(getValue1).toBeDefined();
    });

    it('setValueAndKey 不带时间', async () => {
      const getValue1 = await service.setValueAndKey(key, value);
      expect(getValue1).toBeDefined();
    });

    it('setValueAndKey 强行覆盖', async () => {
      const getValue1 = await service.setValueAndKey(key, value, 500, true);
      expect(getValue1).toBeDefined();
    });

    it('setValueAndKeyAction', async () => {
      const res = await service['setValueAndKeyAction'](key, value);
      expect(res).toEqual(true);
    });

    it('setValueAndKeyAction json 对象', async () => {
      const jsonData = { data: 1 };
      const jsonKey = '321';
      await service['setValueAndKeyAction'](jsonKey, jsonData);
      const getValue = await service.get(jsonKey);
      expect(getValue).toEqual(jsonData);
    });

    it('setValueAndKeyNoExpire 不过期', async () => {
      const key1 = '123456789';
      const value1 = '987654321';
      const res = await service.setValueAndKeyNoExpire(key1, value1);
      expect(res).toEqual(value1 || true);
    });
  });
});
