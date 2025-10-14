// Fix for @nestjs/typeorm crypto.randomUUID() issue in Node.js 18 - MUST be first
import { webcrypto } from 'crypto';
if (!globalThis.crypto) {
  globalThis.crypto = webcrypto as any;
}

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security: Helmet middleware for security headers
  app.use(helmet({
    contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false,
  }));

  // CORS Configuration
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001', 'http://localhost:5173'];
  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Cache-Control', 'Pragma', 'X-Requested-With', 'expires'],
  });

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

  // Swagger Configuration - Only enable in development/staging
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Blue Escape Backend API')
      .setDescription('Complete API documentation for Blue Escape Backend - use /api/docs-json for admin panel integration')
      .setVersion('1.0')
      .addServer(process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`, 'Current Environment')
      .addServer('http://localhost:3000', 'Development')
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

    // Setup Swagger UI
    SwaggerModule.setup('api/docs', app, document);

    // JSON endpoint for admin panel
    app.getHttpAdapter().get('/api/docs-json', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(document);
    });

    console.log(`Swagger UI available at: http://localhost:${process.env.PORT || 3000}/api/docs`);
    console.log(`API JSON for admin panel: http://localhost:${process.env.PORT || 3000}/api/docs-json`);
  } else {
    console.log('Swagger disabled in production mode');
  }

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log('========================================');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Application is running on: ${process.env.API_URL || `http://localhost:${port}`}`);
  console.log(`Health check: ${process.env.API_URL || `http://localhost:${port}`}/api/v1/health`);
  console.log('========================================');
}
bootstrap();
