import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { TransformInterceptor } from './transform.interceptor';

dotenv.config({path: './.env'});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
