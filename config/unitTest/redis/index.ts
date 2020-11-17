import * as redisStore from 'cache-manager-redis-store';

export default {
  store: redisStore,
  host: 'localhost',
  port: 6379,
  //password: '',
  db: 0,
};
