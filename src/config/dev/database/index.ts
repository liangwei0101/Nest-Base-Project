export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  timezone: 'UTC',
  charset: 'utf8mb4',
  synchronize: true,
  logging: false,
  autoLoadEntities: true,
  // subscribers: [__dirname + '/../../../modules/**/*.hook.{ts,js}']
};
