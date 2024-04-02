import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.enableCors({
    origin: '*',
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    credentials: true,
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'PATCH'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Task Board API')
    .setDescription('Task Board API description')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(8000, () => {
    console.log(
      `Server is running on http://localhost:8000\nAPI documentation is available at http://localhost:8000/api/docs`,
    );
  });
}

bootstrap();
