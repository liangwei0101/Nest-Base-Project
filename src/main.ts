import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { TransformInterceptor } from './common/httpHandle/transform.interceptor';
import { HttpExceptionFilter } from './common/httpHandle/httpException';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Swagger API')
    .setDescription('业务API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // 全局使用管道
  app.useGlobalPipes(new ValidationPipe());

  // 全局范围内使用异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());

  // 全局注册拦截器
  app.useGlobalInterceptors(new TransformInterceptor());

  // 全局使用超时拦截
  app.useGlobalInterceptors(new TimeoutInterceptor()); 

  await app.listen(3000);
}
bootstrap();
