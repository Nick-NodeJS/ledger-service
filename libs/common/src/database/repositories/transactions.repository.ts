import { Repository } from 'typeorm';
import { TransactionEntity } from '../entities';

export class TransactionsRepository extends Repository<TransactionEntity> {}
