import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LedgerEntity } from './ledger';

@Entity({ name: 'transactions' })
export class TransactionEntity extends BaseEntity {
  @Column({ type: Number, nullable: false })
  amount: number;

  @Column({ type: String, nullable: true })
  description: string;

  @JoinColumn({ name: 'recipient_ledger_id', referencedColumnName: 'id' })
  @ManyToOne(() => LedgerEntity, { nullable: false })
  recipient: LedgerEntity;

  @JoinColumn({ name: 'sender_ledger_id', referencedColumnName: 'id' })
  @ManyToOne(() => LedgerEntity, { nullable: false })
  sender: LedgerEntity;
}
