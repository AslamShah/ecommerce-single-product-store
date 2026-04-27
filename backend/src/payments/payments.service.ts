import { Injectable, BadRequestException } from '@nestjs/common';
import { SettingsService } from '../settings/settings.service';

@Injectable()
export class PaymentsService {
  constructor(private settingsService: SettingsService) {}

  async getPublicConfig() {
    const settings = await this.settingsService.getSettings();
    return {
      stripePublicKey: settings.stripePublicKey,
      currency: 'usd',
    };
  }

  async createPaymentIntent(amount: number, email: string) {
    const settings = await this.settingsService.getSettings();
    
    if (!settings.stripeSecretKey) {
      throw new BadRequestException('Payment configuration not set');
    }

    const Stripe = require('stripe');
    const stripe = new Stripe(settings.stripeSecretKey);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      receipt_email: email,
      metadata: {
        integration: 'apex-precision',
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  async confirmPayment(paymentIntentId: string) {
    const settings = await this.settingsService.getSettings();
    
    if (!settings.stripeSecretKey) {
      throw new BadRequestException('Payment configuration not set');
    }

    const Stripe = require('stripe');
    const stripe = new Stripe(settings.stripeSecretKey);

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    return {
      status: paymentIntent.status,
      amount: paymentIntent.amount / 100,
    };
  }
}