import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseConfigService } from './database-config.service';
import {
  CurrenciesRepository,
  LedgersRepository,
  TransactionsRepository,
} from './repositories';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfigService,
    }),
  ],
  exports: [
    CurrenciesRepository,
    LedgersRepository,
    TransactionsRepository,
    TypeOrmModule,
  ],
  providers: [CurrenciesRepository, LedgersRepository, TransactionsRepository],
})
export class DatabaseModule {}
