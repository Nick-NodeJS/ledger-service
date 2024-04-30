import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransactionCreateDto {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 12.44,
    description: 'Amount of transaction',
  })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Rental payment',
    description: 'Transaction reason',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1066834,
    description: 'Recipient ledger id',
  })
  recipient: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1066834,
    description: 'Sender ledger id',
  })
  sender: number;
}
