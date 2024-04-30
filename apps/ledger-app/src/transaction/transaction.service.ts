import { Inject, Injectable } from '@nestjs/common';
import { FindManyDto, TransactionCreateDto } from '@app/common/common/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LedgersRepository,
  TransactionsRepository,
} from '@app/common/database/repositories';
import { ConfigService } from '@nestjs/config';
import { LOGGER_SERVICE, LoggerService } from '@app/common';

@Injectable()
export class TransactionService {
  constructor(
    private readonly ledgersRepository: LedgersRepository,
    @InjectRepository(TransactionsRepository)
    private readonly transactionsRepository: TransactionsRepository,
    private readonly config: ConfigService,
    @Inject(LOGGER_SERVICE) private readonly logger: LoggerService,
  ) {}

  async create(transactionsToProcess: TransactionCreateDto[]) {
    const results = [];

    const chunkSize = this.config.get<number>('app.txInserChunk');
    const totalTransactions = transactionsToProcess.length;
    this.logger.log(`START processing transactions ${totalTransactions}`);

    for (let k = 0; k < totalTransactions; k += chunkSize) {
      const limit =
        k + chunkSize < totalTransactions ? k + chunkSize : totalTransactions;
      const promises = [];
      for (let i = 0 + k; i < limit; i++) {
        promises.push(
          this.transactionsRepository.processTransaction(
            transactionsToProcess[i],
          ),
        );
      }
      const result = await Promise.all(promises);
      this.logger.log(
        `PROCESSED transactions ${limit} of ${totalTransactions}`,
      );
      results.push([...result]);
    }

    return results;
  }

  findAll(query: FindManyDto) {
    return this.transactionsRepository.find(query);
  }

  findOne(id: number) {
    return this.transactionsRepository.findOneBy({ id });
  }

  async generate(items: number) {
    const getIndex = function (itemsNumber: number) {
      let index = 0;
      return {
        next: function (): number {
          if (index >= itemsNumber) {
            index = 0;
          }
          return index++;
        },
      };
    };
    const ledgers = await this.ledgersRepository.find({ take: 100 });
    const iterator = await getIndex(ledgers.length);

    const transactions: TransactionCreateDto[] = [];
    for (let i = 0; i < items; i++) {
      const sender = ledgers[iterator.next()].id;
      const recipient = ledgers[iterator.next()].id;
      transactions.push({
        amount: Math.floor(Math.random() * 100),
        sender,
        recipient,
        description: '',
      });
    }

    return transactions;
  }
}
