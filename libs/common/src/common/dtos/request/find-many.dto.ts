import { stringToNumber } from '@app/common/utils';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class FindManyDto {
  @IsNumber()
  @Transform(stringToNumber)
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 10,
    description: 'Number of records to take',
    required: false,
    default: 100,
  })
  take = 100;

  @IsNumber()
  @Transform(stringToNumber)
  @IsOptional()
  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Number of records to skip',
    required: false,
    default: 0,
  })
  skip = 0;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    example: '2024-05-12T00:00:00.000Z',
    description: 'Start date of range to get transaction',
    required: true,
  })
  fromDate: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @ApiProperty({
    type: Date,
    example: '2024-05-12T23:59:59.999Z',
    description: 'End date of range to get transaction',
    required: true,
  })
  toDate: Date;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  @ApiProperty({
    type: Boolean,
    example: 'false',
    description: 'Get result with total count of records',
    default: false,
  })
  withCount = false;
}
