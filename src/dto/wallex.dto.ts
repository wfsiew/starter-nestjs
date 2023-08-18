import { IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WallexWebhookDto {

  @ApiProperty()
  resource: string;

  @ApiProperty()
  resourceId: string;

  @ApiProperty()
  accountId: string;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  remarks: string;

  @ApiPropertyOptional()
  @IsOptional()
  reason: string;
}