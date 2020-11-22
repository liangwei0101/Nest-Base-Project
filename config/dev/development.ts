import database from './database/index';
import redis from './redis/index';

export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 是否开启swagger
  enableSwagger: true,
  // 数据库配置
  DATABASE_CONFIG: database,
  // redis 配置
  redis: redis,
};
