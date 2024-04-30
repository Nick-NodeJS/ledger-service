import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { LedgerAppService } from './ledger-app.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  FindManyDto,
  LedgerCreateDto,
  LedgerDto,
} from '@app/common/common/dtos';

@ApiTags('Ledgers')
@Controller('ledger')
export class LedgerAppController {
  constructor(private readonly ledgerService: LedgerAppService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: LedgerDto })
  create(@Body() body: LedgerCreateDto) {
    return this.ledgerService.create(body);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [LedgerDto] })
  findAll(@Query() query: FindManyDto) {
    return this.ledgerService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: LedgerDto })
  findOne(@Param('id') id: string) {
    return this.ledgerService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ledgerService.remove(+id);
  }
}
