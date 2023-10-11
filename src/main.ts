import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const config = new DocumentBuilder()
  .setTitle('API TASK Ecastillo')
  .setDescription('Aplicación de gestión de Tareas')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);


  const port = configService.get<number>('PORT');

  await app.listen(port);
  console.log(`⚡📱 Application running on port ${port} ...`);
}

server();
