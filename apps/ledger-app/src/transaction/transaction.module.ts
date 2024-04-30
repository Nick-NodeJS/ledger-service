import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { LedgersRepository, TransactionsRepository } from '@app/common/database/repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LedgerEntity, TransactionEntity } from '@app/common/database/entities';

@Module({
  controllers: [TransactionController],
  imports: [TypeOrmModule.forFeature([TransactionEntity, LedgerEntity])],
  providers: [TransactionService, TransactionsRepository, LedgersRepository],
})
export class TransactionModule {}
