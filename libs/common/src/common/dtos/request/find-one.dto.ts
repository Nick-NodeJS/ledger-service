import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class FindOneDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    example: 1066834,
    description: 'Record Id',
  })
  id: number;
}
