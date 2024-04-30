import { FindManyDto, LedgerCreateDto } from '@app/common/common/dtos';
import { LedgersRepository } from '@app/common/database/repositories';
import { CacheService } from '@app/common/services';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LedgerAppService {
  constructor(
    @InjectRepository(LedgersRepository)
    private readonly ledgersRepository: LedgersRepository,
    private readonly cache: CacheService,
  ) {}
  async create(ledgerData: LedgerCreateDto) {
    return this.ledgersRepository.insertOne(ledgerData);
  }

  findAll(query: FindManyDto) {
    return this.ledgersRepository.find(query);
  }

  findOne(id: number) {
    return this.ledgersRepository.findBy({ id });
  }

  remove(id: number) {
    return this.ledgersRepository.delete(id);
  }
}
