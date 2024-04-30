import { CacheService } from '@app/common/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LedgerAppService {
  constructor(private readonly cache: CacheService) {}
  async getHello() {
    const data = { key1: 'key1' };
    await this.cache.set<typeof data>('data', data);
    const dataFromCache = await this.cache.get<typeof data>('data');
    return 'Hello from Ledger Service! ' + JSON.stringify(dataFromCache);
  }
}
