import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  
  const configService = app.get(ConfigService);
  
  // Security headers with Helmet
  app.use(helmet());
  
  // CORS configuration - allow multiple origins
  const corsOrigins = configService.get('CORS_ORIGINS') || 'http://localhost:3000';
  const origins = corsOrigins.split(',').map(o => o.trim());
  
  app.enableCors({
    origin: origins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });
  
  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
    transformOptions: {
      enableImplicitConversion: true,
    },
  }));
  
  // Global prefix
  app.setGlobalPrefix('api');
  
  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  const port = configService.get('PORT') || 3001;
  const host = configService.get('HOST') || '0.0.0.0';
  
  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGTERM', 'SIGINT'];
  signals.forEach(signal => {
    process.on(signal, async () => {
      logger.log(`Received ${signal}, starting graceful shutdown...`);
      await app.close();
      logger.log('Application shutdown complete');
      process.exit(0);
    });
  });
  
  await app.listen(port, host);
  logger.log(`🚀 Backend running on http://${host}:${port}`);
  logger.log(`📚 API available at http://${host}:${port}/api`);
  logger.log(`🏥 Health check: http://${host}:${port}/api/health`);
}
bootstrap();