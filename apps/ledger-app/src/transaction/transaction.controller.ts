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
import { ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindManyDto,
  TransactionCreateDto,
  TransactionDto,
} from '@app/common/common/dtos';
import {
  DebitCreditTransactions,
  transactionsWithCountSchema,
} from '@app/common/common/dtos/response/debit-credit-transactions.dto';

@ApiTags('Transactions')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() body: TransactionCreateDto[]) {
    return this.transactionService.create(body);
  }

  @Get()
  @ApiResponse({ schema: transactionsWithCountSchema, status: HttpStatus.OK })
  findAll(@Query() query: FindManyDto) {
    return this.transactionService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: TransactionDto })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(+id);
  }

  @Get('ledger/:ledger_id')
  @ApiOkResponse({ status: HttpStatus.OK, type: DebitCreditTransactions })
  findByLedgerId(
    @Query() query: FindManyDto,
    @Param('ledger_id') ledgerId: string,
  ) {
    return this.transactionService.findByLedgerId(+ledgerId, query);
  }

  @Post('generate')
  @ApiResponse({ status: HttpStatus.OK, type: [TransactionDto] })
  generate(@Query('items') items: number) {
    return this.transactionService.generate(items);
  }
}
