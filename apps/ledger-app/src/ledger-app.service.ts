import { Injectable } from '@nestjs/common';

@Injectable()
export class LedgerAppService {
  getHello(): string {
    return 'Hello from Ledger Service!';
  }
}
