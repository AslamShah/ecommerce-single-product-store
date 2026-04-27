import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  getMongoStatus(): string {
    const { readyState } = this.connection;
    
    switch (readyState) {
      case 0:
        return 'disconnected';
      case 1:
        return 'connected';
      case 2:
        return 'connecting';
      case 3:
        return 'disconnecting';
      default:
        return 'unknown';
    }
  }
}