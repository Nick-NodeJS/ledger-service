import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { LegerCreateDTO } from './ledger-create.dto';

export class LegerDTO extends LegerCreateDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1066834, description: 'Ledger id' })
  id: number;
}
