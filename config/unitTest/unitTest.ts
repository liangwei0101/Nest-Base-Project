import redis from './redis/index';

export default {
  // 端口
  port: parseInt(process.env.PORT, 10) || 3000,
  // 是否开启swagger
  enableSwagger: true,
  // 数据库配置
  DATABASE_CONFIG: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '58637',
    database: 'postgres',
    timezone: 'UTC',
    charset: 'utf8mb4',
    synchronize: true,
    logging: false,
    autoLoadEntities: true,
  },
  // redis 配置
  redis: redis,
};
