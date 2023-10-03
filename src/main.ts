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

  await app.listen(configService.get("PORT"));
  
  console.log(`⚡📱Aplication running  on  port ${await (configService.get("PORT"))} ...`)
}
server();
