import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { CurrencyEntity } from './currency';

@Entity({ name: 'ledgers' })
export class LedgerEntity extends BaseEntity {
  @Column({ type: Number, nullable: false })
  public balance: number;

  @JoinColumn({ name: 'currency_code', referencedColumnName: 'code' })
  @ManyToOne(() => CurrencyEntity, { nullable: false, onDelete: 'CASCADE' })
  currency: CurrencyEntity;
}
