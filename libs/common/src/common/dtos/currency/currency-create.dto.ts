import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CurrencyCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'EUR', description: 'Currency code' })
  public code: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 2, description: 'Currency decimal' })
  public decimals: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: 'Euro', description: 'Currency name' })
  public name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String, example: '€', description: 'Currency symbol' })
  public symbol: string;
}
