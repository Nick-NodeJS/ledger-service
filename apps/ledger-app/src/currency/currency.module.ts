import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyController } from './currency.controller';
import { CurrencyEntity } from '@app/common/database/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesRepository } from '@app/common/database/repositories';

@Module({
  controllers: [CurrencyController],
  imports: [TypeOrmModule.forFeature([CurrencyEntity])],
  providers: [CurrencyService, CurrenciesRepository],
})
export class CurrencyModule {}
