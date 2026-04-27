import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  storeName?: string;

  @IsOptional()
  @IsString()
  storeEmail?: string;

  @IsOptional()
  @IsString()
  stripePublicKey?: string;

  @IsOptional()
  @IsString()
  stripeSecretKey?: string;

  @IsOptional()
  @IsString()
  stripeWebhookSecret?: string;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsNumber()
  shippingCost?: number;

  @IsOptional()
  @IsNumber()
  freeShippingThreshold?: number;
}