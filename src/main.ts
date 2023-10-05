import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

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

  const port = configService.get<number>('PORT');

  await app.listen(port);
  console.log(`⚡📱 Application running on port ${port} ...`);
}

server();
