export default {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'test',
  timezone: 'UTC',
  charset: 'utf8mb4',
  synchronize: false,
  logging: false,
  entities: [__dirname + '/../../../entity/**.entity.{ts,js}',__dirname + '/../../../entity/**/**.entity.{ts,js}'],
};