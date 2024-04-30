import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { CurrencyService } from './currency.service';
import {
  CurrencyCreateDto,
  CurrencyDto,
  CurrencyUpdateDto,
  FindManyDto,
} from '@app/common/common/dtos';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Currencies')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @ApiResponse({ status: HttpStatus.OK, type: CurrencyDto })
  create(@Body() createCurrencyDto: CurrencyCreateDto) {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: [CurrencyDto] })
  findAll(@Query() query: FindManyDto) {
    return this.currencyService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CurrencyDto })
  findOne(@Param('id') id: string) {
    return this.currencyService.findOne(+id);
  }

  @Patch(':id')
  @ApiBody({ type: CurrencyUpdateDto })
  update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: CurrencyUpdateDto,
  ) {
    return this.currencyService.update(+id, updateCurrencyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.currencyService.remove(+id);
  }
}
