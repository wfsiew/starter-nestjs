import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class IPayPaymentResponseDto {
  @ApiProperty()
  MerchantCode: string;

  @ApiProperty()
  PaymentId: string;

  @ApiProperty()
  RefNo: string;

  @ApiProperty()
  Amount: string;

  @ApiProperty()
  Currency: string;

  @ApiPropertyOptional()
  @IsOptional()
  Remark: string;

  @ApiPropertyOptional()
  @IsOptional()
  TransId: string;

  @ApiPropertyOptional()
  @IsOptional()
  AuthCode: string;

  @ApiProperty()
  Status: string;

  @ApiPropertyOptional()
  @IsOptional()
  ErrDesc: string;

  @ApiProperty()
  Signature: string;

  @ApiPropertyOptional()
  @IsOptional()
  CCName: string;

  @ApiPropertyOptional()
  @IsOptional()
  CCNo: string;

  @ApiPropertyOptional()
  @IsOptional()
  S_bankname: string;

  @ApiPropertyOptional()
  @IsOptional()
  S_country: string;
}