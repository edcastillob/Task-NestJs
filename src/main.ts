import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function server() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'))
  const configService = app.get(ConfigService)

  app.enableCors(CORS);  
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({
    transformOptions: {
      enableImplicitConversion: true,
    }
  }))

  const reflector = app.get(Reflector)
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector))

  const port = configService.get<number>('PORT');

  await app.listen(port);
  console.log(`⚡📱 Application running on port ${port} ...`);
}

server();
