import developmentConfig from './dev/development';
import stagingConfig from './staging/staging';
import productionConfig from './prod/production';

const configs = {
  development: developmentConfig,
  test: stagingConfig,
  production: productionConfig,
};
const env = process.env.NODE_ENV || 'development';

export default () => configs[env];