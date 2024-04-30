import {
  CurrencyCreateDto,
  CurrencyUpdateDto,
  FindManyDto,
} from '@app/common/common/dtos';
import { ErrorReason } from '@app/common/common/enums';
import { CurrenciesRepository } from '@app/common/database/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CurrencyService {
  constructor(
    @InjectRepository(CurrenciesRepository)
    private readonly currenciesRepository: CurrenciesRepository,
  ) {}
  async create(currencyData: CurrencyCreateDto) {
    const currency = await this.currenciesRepository.findByCode(
      currencyData.code,
    );
    if (currency) {
      throw new BadRequestException(ErrorReason.DUPLICATE_ITEMS);
    }
    return this.currenciesRepository.insertOne(currencyData);
  }

  findAll(query: FindManyDto) {
    return this.currenciesRepository.find(query);
  }

  findOne(id: number) {
    return this.currenciesRepository.findBy({ id });
  }

  update(id: number, currencyData: CurrencyUpdateDto) {
    return this.currenciesRepository.updateOne(id, currencyData);
  }

  remove(id: number) {
    return this.currenciesRepository.delete(id);
  }
}
