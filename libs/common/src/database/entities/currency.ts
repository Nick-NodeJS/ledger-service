import { BaseEntity } from './base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Unique(['code'])
@Entity({ name: 'carrencies' })
export class CurrencyEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  public code: string;

  @Column({ type: Number, nullable: false })
  public decimals: number;

  @Column({ type: String, nullable: false })
  public name: string;

  @Column({ type: String, nullable: false })
  public symbol: string;
}
