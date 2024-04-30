import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { TransactionCreateDTO } from './transaction-create.dto';

export class TransactionDTO extends TransactionCreateDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1066834,
    description: 'Transaction id',
  })
  id: number;
}
