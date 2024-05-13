import { ApiProperty } from '@nestjs/swagger';
import { TransactionDto } from '../transaction';
import { WithCount } from '../../types/records-with-count.type';

export const transactionsWithCountSchema = {
  type: 'object',
  properties: {
    records: {
      type: 'array',
      items: {
        type: 'TransactionDto',
      },
    },
    count: {
      type: 'number',
    },
  },
};

export class DebitCreditTransactions {
  @ApiProperty(transactionsWithCountSchema)
  debitTransactions: WithCount<TransactionDto>;

  @ApiProperty(transactionsWithCountSchema)
  creditTransactions: WithCount<TransactionDto>;
}
