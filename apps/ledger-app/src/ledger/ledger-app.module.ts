import { Inject, Module } from '@nestjs/common';
import { LedgerAppController } from './ledger-app.controller';
import { LedgerAppService } from './ledger-app.service';
import { CommonModule, LOGGER_SERVICE, LoggerService } from '@app/common';
import configuration from '@app/common/config/configuration';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyEntity } from '@app/common/database/entities/currency';
import { LedgerEntity } from '@app/common/database/entities/ledger';
import { TransactionEntity } from '@app/common/database/entities/transaction';
import { CacheService } from '@app/common/services';

@Module({
  imports: [
    CommonModule.register({
      serviceIdentifier: 'ledger-service',
      config: configuration(config),
    }),
    TypeOrmModule.forFeature([CurrencyEntity, LedgerEntity, TransactionEntity]),
  ],
  controllers: [LedgerAppController],
  providers: [LedgerAppService, CacheService],
})
export class LedgerAppModule {
  constructor(@Inject(LOGGER_SERVICE) private readonly logger: LoggerService) {}

  onModuleInit(): void {
    const { ENV, SERVICE_NAME, SERVICE_PORT, SERVICE_HOST } = process.env;
    this.logger.log(
      {
        env: ENV,
        name: SERVICE_NAME,
        host: SERVICE_HOST,
        port: SERVICE_PORT,
      },
      'App',
    );
  }
}
