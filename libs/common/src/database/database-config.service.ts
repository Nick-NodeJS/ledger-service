import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { LOGGER_SERVICE, LoggerService } from '../logger';


@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(LOGGER_SERVICE) private readonly logger: LoggerService,
    private readonly configService: ConfigService,
  ) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    this.logger.log(`Database user used: ${this.configService.get<string>('database.username')}`);
    // USE IT TO GENERATE MIGRATIONS
    // return { ...this.configService.get('database') };
    return {
      autoLoadEntities: true,
      type: 'postgres',
      schema: this.configService.get<string>('database.schema'),
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      synchronize: this.configService.get<boolean>('database.synchronize'),
      logging: this.configService.get<boolean>('database.logging'),
      namingStrategy: new SnakeNamingStrategy(),
      applicationName: 'ledger-service',
    };
  }
}
