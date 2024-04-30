import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CurrencyUpdateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'EUR',
    description: 'Currency code',
    required: false,
  })
  public code?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 2,
    description: 'Currency decimal',
    required: false,
  })
  public decimals?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: 'Euro',
    description: 'Currency name',
    required: false,
  })
  public name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    example: '€',
    description: 'Currency symbol',
    required: false,
  })
  public symbol?: string;
}
