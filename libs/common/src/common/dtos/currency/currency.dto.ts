import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

import { CurrencyCreateDto } from './currency-create.dto';

export class CurrencyDto extends CurrencyCreateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1066834, description: 'Currency id' })
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
