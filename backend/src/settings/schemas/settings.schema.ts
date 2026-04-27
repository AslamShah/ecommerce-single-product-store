import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Settings extends Document {
  @Prop()
  storeName: string;

  @Prop()
  storeEmail: string;

  @Prop()
  stripePublicKey: string;

  @Prop()
  stripeSecretKey: string;

  @Prop()
  stripeWebhookSecret: string;

  @Prop({ default: 'usd' })
  currency: string;

  @Prop({ default: 0 })
  shippingCost: number;

  @Prop({ default: 50000 })
  freeShippingThreshold: number;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);