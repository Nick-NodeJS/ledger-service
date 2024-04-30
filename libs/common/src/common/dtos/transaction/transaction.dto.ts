import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { TransactionCreateDto } from './transaction-create.dto';

export class TransactionDto extends TransactionCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1066834,
    description: 'Transaction id',
  })
  id: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: '2024-04-30T09:35:44.346Z',
    description: 'Created date',
  })
  createdAt: Date;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: '2024-04-30T09:35:44.346Z',
    description: 'Updated date',
  })
  updatedAt: Date;
}
