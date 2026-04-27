import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  orderNumber: string;

  @Prop({ required: true })
  customerEmail: string;

  @Prop({ required: true })
  customerName: string;

  @Prop()
  customerPhone: string;

  @Prop({ required: true, type: Object })
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  @Prop({ required: true, type: Object })
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }[];

  @Prop({ required: true })
  subtotal: number;

  @Prop()
  shippingCost: number;

  @Prop({ required: true })
  total: number;

  @Prop({ default: 'pending', enum: ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'] })
  status: string;

  @Prop()
  stripePaymentIntentId: string;

  @Prop()
  paidAt: Date;

  @Prop()
  shippedAt: Date;

  @Prop()
  deliveredAt: Date;

  @Prop()
  notes: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);