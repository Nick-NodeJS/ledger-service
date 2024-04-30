import { plainToClass } from 'class-transformer';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { LOGGER_SERVICE, LoggerService } from '@app/common/logger';
import { CacheService } from '@app/common/services';
import { LedgersRepository } from './ledgers.repository';

@Injectable()
export class LedgersCachedRepository {
  constructor(
    private readonly config: ConfigService,
    private readonly cache: CacheService,
    @Inject(LOGGER_SERVICE) private readonly logger: LoggerService,
    @InjectRepository(LedgersRepository)
    private readonly ledgersRepository: LedgersRepository,
  ) {}
}
