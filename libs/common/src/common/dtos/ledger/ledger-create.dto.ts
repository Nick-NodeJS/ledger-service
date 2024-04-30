import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LedgerCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1000, description: 'Ledger balance' })
  balance: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'EUR',
    description: 'Ledger currency code',
  })
  currency: string;
}
