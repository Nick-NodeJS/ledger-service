import { DataSource, Repository } from 'typeorm';
import { CurrencyEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { CurrencyCreateDto, CurrencyUpdateDto } from '@app/common/common/dtos';

@Injectable()
export class CurrenciesRepository extends Repository<CurrencyEntity> {
  constructor(private dataSource: DataSource) {
    super(CurrencyEntity, dataSource.createEntityManager());
  }

  findByCode(code: string) {
    return this.findOneBy({ code });
  }

  async insertOne(currencyData: CurrencyCreateDto) {
    const { id } = (await this.insert(currencyData))?.identifiers.pop();
    return this.findOneBy({ id });
  }

  async updateOne(id: number, currencyData: CurrencyUpdateDto) {
    const currency = await this.findOneBy({ id });
    return this.save(Object.assign(currency, currencyData));
  }
}
