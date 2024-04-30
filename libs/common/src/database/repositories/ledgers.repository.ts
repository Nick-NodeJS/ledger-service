import { DataSource, Repository } from 'typeorm';
import { LedgerEntity } from '../entities/ledger';
import { Injectable } from '@nestjs/common';
import { LedgerCreateDto } from '@app/common/common/dtos';
import { CurrencyEntity } from '../entities';

@Injectable()
export class LedgersRepository extends Repository<LedgerEntity> {
  constructor(private dataSource: DataSource) {
    super(LedgerEntity, dataSource.createEntityManager());
  }

  async insertOne(ledgerData: LedgerCreateDto) {
    const currenciesReposytory = this.dataSource.getRepository(CurrencyEntity);
    const currency = await currenciesReposytory.findOneBy({
      code: ledgerData.currency,
    });
    const { id } = (
      await this.insert({ balance: ledgerData.balance, currency })
    ).identifiers.pop();
    return this.findOneBy({ id });
  }
}
