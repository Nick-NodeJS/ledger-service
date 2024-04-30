import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';
import { LedgerCreateDto } from './ledger-create.dto';

export class LedgerDto extends LedgerCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1066834, description: 'Ledger id' })
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
