declare const module: any;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipeConfig } from './common/pipe/validationPipe';
import { HttpExceptionFilter } from './common/httpHandle/httpException';
import { TransformInterceptor } from './common/httpHandle/transform.interceptor';
import { TimeoutInterceptor } from './common/httpHandle/timeout.interceptor';
import * as bodyParser from 'body-parser';
import { getConnection } from 'typeorm';
import { ConsulConfig } from './common/utils/consulConfigUtil';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

  // 热重载
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(async () => {
      await getConnection().close();
      await app.close();
    });
  }

  // app.setGlobalPrefix('/core');

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Swagger API')
    .setDescription('业务API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // 全局使用限速(防止暴力攻击)
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5000, // limit each IP to 500 requests per windowMs
    }),
  );

  // 全局使用管道
  app.useGlobalPipes(new ValidationPipeConfig());

  // 全局范围内使用异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局使用超时拦截
  app.useGlobalInterceptors(new TimeoutInterceptor());

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  console.log('application is start :' + 3000);

  // TODO 如果本地没有装的话，把注册中心的相关代码去掉。
  if (true) {
    new ConsulConfig();
  }
}
bootstrap();
