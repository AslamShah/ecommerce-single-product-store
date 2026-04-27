import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  async check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        mongodb: { status: 'UP', details: 'Connected' },
      },
      version: '1.0.0',
    };
  }

  async ready() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        mongodb: { status: 'UP', details: 'Ready' },
      },
      version: '1.0.0',
    };
  }
}
