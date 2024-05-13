import { Between, DataSource, In, Repository } from 'typeorm';
import { LedgerEntity, TransactionEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { FindManyDto, TransactionCreateDto } from '@app/common/common/dtos';
import { checkBalance } from '@app/common/utils';
import { BadTransactionReason } from '@app/common/enums';
import { TransactionValidation } from '@app/common/common/types';

@Injectable()
export class TransactionsRepository extends Repository<TransactionEntity> {
  constructor(private dataSource: DataSource) {
    super(TransactionEntity, dataSource.createEntityManager());
  }

  async processTransaction(transactionToProcess: TransactionCreateDto) {
    return this.dataSource.manager.transaction(
      async (transactionalEntityManager) => {
        const [sender, recipient] = await transactionalEntityManager.find(
          LedgerEntity,
          {
            where: {
              id: In([
                transactionToProcess.sender,
                transactionToProcess.recipient,
              ]),
            },
          },
        );
        const validationResult = this.checkIfTransactionIsValid(
          transactionToProcess,
          sender,
          recipient,
        );
        if (!validationResult.isValid) {
          transactionToProcess.description = validationResult.reason;
        } else {
          sender.balance -= transactionToProcess.amount;
          recipient.balance += transactionToProcess.amount;
        }
        const newTransaction = {
          ...transactionToProcess,
          sender,
          recipient,
        };

        const [_, transactionInsertResult] = await Promise.all([
          transactionalEntityManager.save(LedgerEntity, [sender, recipient]),
          transactionalEntityManager.insert(TransactionEntity, newTransaction),
        ]);
        const { id } = transactionInsertResult.identifiers.pop();
        return await transactionalEntityManager.findOneBy(TransactionEntity, {
          id,
        });
      },
    );
  }

  private checkIfTransactionIsValid(
    transaction: TransactionCreateDto,
    sender: LedgerEntity,
    recipient: LedgerEntity,
  ): TransactionValidation {
    const validationResult: TransactionValidation = {
      isValid: true,
    };
    if (!checkBalance(sender.balance, transaction.amount)) {
      validationResult.isValid = false;
      validationResult.reason = BadTransactionReason.NOT_ENOUGH_MONEY;
    }
    if (!recipient) {
      validationResult.isValid = false;
      validationResult.reason = BadTransactionReason.RECIPIENT_UNKNOWN;
    }
    if (!sender) {
      validationResult.isValid = false;
      validationResult.reason = BadTransactionReason.UNKNOWN_TRANSACTION_OWNER;
    }
    return validationResult;
  }

  async findAll(query: FindManyDto) {
    const { take, skip, fromDate, toDate, withCount } = query;

    const [transactions, count] = await Promise.all([
      this.find({
        take,
        skip,
        where: { createdAt: Between(fromDate, toDate) },
        relations: {
          sender: true,
          recipient: true,
        },
      }),
      ...(withCount
        ? [this.count({ where: { createdAt: Between(fromDate, toDate) } })]
        : []),
    ]);
    return {
      records: transactions,
      count,
    };
  }

  /**
   *
   * @param ledgerId The ledger id to query transactions
   * @param query close to FindManyOptions(custom, see '@app/common/common/dtos') to filter transactions
   * @param debit the flag to get debit or credit transactions
   *    (default = 'true' - means it returns debit transactions, 'false' = credit)
   * @returns Object
   *  ```
   *  {
   *      records: TransactionEntity[],
   *      count: number,
   *  }
   * ```
   */
  async findAllByLedgerId(
    ledgerId: number,
    { withCount, ...query }: FindManyDto,
    debit = true,
  ) {
    const ormQuery = this.getFindAllByLEdgerIdQuery(
      ledgerId,
      query,
      false,
      debit,
    );
    const ormCountQuery = this.getFindAllByLEdgerIdQuery(
      ledgerId,
      query,
      true,
      debit,
    );
    const [transactions, count] = await Promise.all([
      this.find(ormQuery),
      ...(withCount ? [this.count(ormCountQuery)] : []),
    ]);
    return {
      records: transactions,
      count,
    };
  }
  private getFindAllByLEdgerIdQuery(
    ledgerId: number,
    query: Omit<FindManyDto, 'withCount'>,
    withCount,
    debit,
  ) {
    const { take, skip, fromDate, toDate } = query;
    return {
      ...(withCount
        ? {}
        : {
            take,
            skip,
          }),
      where: {
        ...(debit
          ? { recipient: { id: ledgerId } }
          : { sender: { id: ledgerId } }),
        createdAt: Between(fromDate, toDate),
      },
      select: {
        id: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        sender: { id: true },
        recipient: { id: true },
      },
      relations: {
        sender: true,
        recipient: true,
      },
    };
  }
}
