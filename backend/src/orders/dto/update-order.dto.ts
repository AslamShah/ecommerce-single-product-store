import { IsString, IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  shippedAt?: Date;

  @IsOptional()
  @IsString()
  deliveredAt?: Date;
}