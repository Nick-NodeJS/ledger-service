import { DataSource, In, Repository } from 'typeorm';
import { LedgerEntity, TransactionEntity } from '../entities';
import { Injectable } from '@nestjs/common';
import { TransactionCreateDto, TransactionDto } from '@app/common/common/dtos';
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
}
