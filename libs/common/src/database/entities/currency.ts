import { BaseEntity } from './base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Unique(['code'])
@Entity({ name: 'carrencies' })
export class CurrencyEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  code: string;

  @Column({ type: Number, nullable: false })
  decimals: number;

  @Column({ type: String, nullable: false })
  name: string;

  @Column({ type: String, nullable: false })
  symbol: string;
}
