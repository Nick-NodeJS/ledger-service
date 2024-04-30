import { stringToNumber } from '@app/common/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class FindManyDto {
  @IsNumber()
  @Transform(stringToNumber)
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Number of records to take',
    required: false,
  })
  take?: number;

  @IsNumber()
  @Transform(stringToNumber)
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Number of records to skip',
    required: false,
  })
  skip?: number;
}
