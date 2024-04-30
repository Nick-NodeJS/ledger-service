import { Repository } from 'typeorm';
import { CurrencyEntity } from '../entities';

export class CurrenciesRepository extends Repository<CurrencyEntity> {}
