import { Controller, Get, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Get('config')
  getPublicConfig() {
    return this.paymentsService.getPublicConfig();
  }

  @Post('create-intent')
  createPaymentIntent(@Body() body: { amount: number; email: string }) {
    return this.paymentsService.createPaymentIntent(body.amount, body.email);
  }

  @Post('confirm')
  confirmPayment(@Body() body: { paymentIntentId: string }) {
    return this.paymentsService.confirmPayment(body.paymentIntentId);
  }
}