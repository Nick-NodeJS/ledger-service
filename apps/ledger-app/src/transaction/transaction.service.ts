import { Inject, Injectable } from '@nestjs/common';
import {
  DebitCreditTransactions,
  FindManyDto,
  TransactionCreateDto,
  TransactionDto,
} from '@app/common/common/dtos';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LedgersRepository,
  TransactionsRepository,
} from '@app/common/database/repositories';
import { ConfigService } from '@nestjs/config';
import { LOGGER_SERVICE, LoggerService } from '@app/common';
import { retryAsyncOperation } from '@app/common/utils/retry-async-operation';
import { TransactionEntity } from '@app/common/database/entities';
import { WithCount } from '@app/common/common/types/records-with-count.type';

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
          retryAsyncOperation<TransactionEntity, LoggerService>({
            operation: this.transactionsRepository.processTransaction.bind(
              this.transactionsRepository,
            ),
            args: [transactionsToProcess[i]],
            delay: this.config.get<number>('app.asyncOperationDelay'),
            maxRetries: this.config.get<number>('app.maxAsyncOperationRetries'),
            logger: this.logger,
          }),
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

  async findAll(query: FindManyDto): Promise<WithCount<TransactionDto>> {
    const { records, count } = await this.transactionsRepository.findAll(query);
    return {
      records: records.map(this.mapEntityToDto),
      count,
    };
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

  async findByLedgerId(
    ledgerId: number,
    query: FindManyDto,
  ): Promise<DebitCreditTransactions> {
    const [debitTransactionEntities, creditTransactionEntities] =
      await Promise.all([
        this.transactionsRepository.findAllByLedgerId(ledgerId, query),
        this.transactionsRepository.findAllByLedgerId(ledgerId, query, false),
      ]);
    return {
      debitTransactions: {
        records: debitTransactionEntities.records.map(this.mapEntityToDto),
        count: debitTransactionEntities.count,
      },
      creditTransactions: {
        records: creditTransactionEntities.records.map(this.mapEntityToDto),
        count: creditTransactionEntities.count,
      },
    };
  }

  private mapEntityToDto({
    sender,
    recipient,
    id,
    createdAt,
    updatedAt,
    amount,
    description,
  }): TransactionDto {
    return {
      sender: sender.id,
      recipient: recipient.id,
      id,
      createdAt,
      updatedAt,
      amount,
      description,
    };
  }
}
