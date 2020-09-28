import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  private readonly ttl = 60;
  private readonly OK = 'OK';

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  /**
   * 设置key 和 value
   * @param key 唯一key
   * @param value value
   * @param ttl 过期时间，默认 60s
   * @param overwrite 是否覆盖 默认 false
   */
  public async setValueAndKey(key: string, value: any, ttl = this.ttl, overwrite = false): Promise<boolean> {
    if (overwrite) {
      return await this.setValueAndKeyAction(key, value, ttl);
    } else {
      const res = await this.get(key);
      return res ? res : await this.setValueAndKeyAction(key, value, ttl);
    }
  }

  /**
   * 设置key 和 value(不过期)
   * @param key 唯一key
   * @param value value
   * @param overwrite 是否覆盖 默认 false
   */
  public async setValueAndKeyNoExpire(key: string, value: any, overwrite = false): Promise<boolean> {
    if (overwrite) {
      return await this.setValueAndKeyAction(key, value, 0);
    } else {
      const res = await this.get(key);
      return res ? res : await this.setValueAndKeyAction(key, value, 0);
    }
  }

  /**
   * 根据key查找 value
   */
  public async get(key: string): Promise<any> {
    return await this.cache.get(key);
  }

  /**
   * 根据key 删除 value
   */
  public async deleteValueByKey(key: string): Promise<boolean> {
    const res = await this.cache.del(key);
    return res ? true : false;
  }

  /**
   * 关闭连接
   */
  public async disConnect(): Promise<any> {
    return await this.cache.store.getClient().end(true);
  }

  /**
   * 设置value
   */
  private async setValueAndKeyAction(key: string, value: any, ttl = this.ttl): Promise<boolean> {
    const res = await this.cache.set(key, value, { ttl });
    return res.toString() === this.OK ? true : false;
  }
}
