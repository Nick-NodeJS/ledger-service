import { BaseEntity } from './base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { LedgerEntity } from './ledger';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({ name: 'transactions' })
export class TransactionEntity extends BaseEntity {
  @ApiProperty({ type: Number })
  @Column({ type: Number, nullable: false })
  amount: number;

  @ApiProperty({ type: String })
  @Column({ type: String, nullable: true })
  description: string;

  @Expose()
  @JoinColumn({ name: 'recipient_ledger_id', referencedColumnName: 'id' })
  @ManyToOne(() => LedgerEntity, { nullable: true })
  recipient: LedgerEntity | null;

  @Expose()
  @JoinColumn({ name: 'sender_ledger_id', referencedColumnName: 'id' })
  @ManyToOne(() => LedgerEntity, { nullable: true })
  sender: LedgerEntity | null;
}
