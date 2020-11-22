import developmentConfig from './dev/development';
// import stagingConfig from './staging/staging';
import productionConfig from './prod/production';
import unitTestConfig from './unitTest/unitTest'

const configs = {
  development: developmentConfig,
  test: unitTestConfig,
  production: productionConfig,
};

const env = process.env.NODE_ENV || 'development';

console.log('current env：' + env)

export default () => configs[env];