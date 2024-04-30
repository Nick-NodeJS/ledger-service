import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { CurrencyCreateDTO } from './currency-create.dto';

export class CurrencyDTO extends CurrencyCreateDTO {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ type: Number, example: 1066834, description: 'Currency id' })
  id: number;
}
