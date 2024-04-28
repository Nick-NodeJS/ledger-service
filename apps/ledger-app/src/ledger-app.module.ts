import { Module } from '@nestjs/common';
import { LedgerAppController } from './ledger-app.controller';
import { LedgerAppService } from './ledger-app.service';

@Module({
  imports: [],
  controllers: [LedgerAppController],
  providers: [LedgerAppService],
})
export class LedgerAppModule {}
