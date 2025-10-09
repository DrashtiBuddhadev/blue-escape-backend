// Fix for @nestjs/typeorm crypto.randomUUID() issue in Node.js 18 - MUST be first
import { webcrypto } from 'crypto';
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
    defaultVersion: '1',
  });

  app.enableCors();

  // Swagger Configuration for Admin Panel Integration
  const config = new DocumentBuilder()
    .setTitle('Blue Escape Backend API')
    .setDescription('Complete API documentation for Blue Escape Backend - use /api/docs-json for admin panel integration')
    .setVersion('1.0')
    .addServer(`http://localhost:${process.env.PORT || 3000}`, 'Development')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('blogs', 'Blog management endpoints')
    .addTag('collections', 'Collection management endpoints')
    .addTag('contact', 'Contact inquiry endpoints')
    .addTag('experiences', 'Experience management endpoints')
    .addTag('health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger UI (optional - for development)
  SwaggerModule.setup('api/docs', app, document);

  // This is the main endpoint your admin panel will use
  app.getHttpAdapter().get('/api/docs-json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(document);
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger UI available at: http://localhost:${port}/api/docs`);
  console.log(`API JSON for admin panel: http://localhost:${port}/api/docs-json`);
}
bootstrap();
