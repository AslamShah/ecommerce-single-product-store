import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { HealthController } from './health.controller';
import { AppService } from './app.service';
import { HealthService } from './health.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { SettingsModule } from './settings/settings.module';
import { FileModule } from './common/file.module';

let mongoUri: string;

async function getMongoUri(): Promise<string> {
  const configService = new ConfigService();
  const mongoConnection = configService.get('MONGODB_URI') || 'mongodb://localhost:27017/apex-precision';
  
  // Check if we should use in-memory MongoDB
  const useInMemory = configService.get('USE_IN_MEMORY_MONGODB') === 'true' || process.env.USE_IN_MEMORY_MONGODB === 'true';
  
  if (useInMemory) {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    const mongoServer = await MongoMemoryServer.create();
    return mongoServer.getUri();
  }
  
  return mongoConnection;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const useInMemory = configService.get('USE_IN_MEMORY_MONGODB') === 'true' || process.env.USE_IN_MEMORY_MONGODB === 'true';
        
        let uri: string;
        if (useInMemory) {
          const { MongoMemoryServer } = await import('mongodb-memory-server');
          const mongoServer = await MongoMemoryServer.create();
          uri = mongoServer.getUri();
          console.log('Using in-memory MongoDB');
        } else {
          uri = configService.get('MONGODB_URI') || 'mongodb://localhost:27017/apex-precision';
        }
        
        return {
          uri,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          authSource: 'admin',
        };
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        throttlers: [
          {
            name: 'default',
            ttl: configService.get('THROTTLE_TTL') || 60000,
            limit: configService.get('THROTTLE_LIMIT') || 100,
          },
          {
            name: 'short',
            ttl: 1000,
            limit: 10,
          },
          {
            name: 'long',
            ttl: 60000,
            limit: 100,
          },
        ],
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/api/uploads',
    }),
    AuthModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    SettingsModule,
    FileModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, HealthService],
})
export class AppModule {}
