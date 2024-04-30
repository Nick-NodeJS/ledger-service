import { Repository } from 'typeorm';
import { LedgerEntity } from '../entities/ledger';

export class LedgersRepository extends Repository<LedgerEntity> {}
