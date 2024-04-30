import { Controller, Get } from '@nestjs/common';
import { LedgerAppService } from './ledger-app.service';

@Controller()
export class LedgerAppController {
  constructor(private readonly ledgerAppService: LedgerAppService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.ledgerAppService.getHello();
  }
}
