import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindManyDto,
  TransactionCreateDto,
  TransactionDto,
} from '@app/common/common/dtos';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() body: TransactionCreateDto[]) {
    return this.transactionService.create(body);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [TransactionDto] })
  findAll(@Query() query: FindManyDto) {
    return this.transactionService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: TransactionDto })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Post('generate')
  @ApiResponse({ status: HttpStatus.OK, type: [TransactionDto] })
  generate(@Query('items') items: number) {
    return this.transactionService.generate(items);
  }
}
