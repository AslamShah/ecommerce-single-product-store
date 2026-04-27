import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Redirect('/api')
  getRoot() {
    return { message: 'Apex Precision API' };
  }

  @Get('api')
  getApi() {
    return {
      message: 'Welcome to Apex Precision API',
      endpoints: {
        auth: '/api/auth',
        products: '/api/products',
        orders: '/api/orders',
        payments: '/api/payments',
        settings: '/api/settings',
      },
    };
  }
}
