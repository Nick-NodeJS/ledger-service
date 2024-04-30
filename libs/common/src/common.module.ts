import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigModuleOptions } from './config';
import { LoggerModule } from './logger';
import { WinstonModule } from 'nest-winston';
import { getWinstonParams } from './logger/logger.config';
import { ContextModule } from './context/context.module';

export { LOGGER_SERVICE } from './logger/logger.module';
export { LoggerService } from './logger/logger.service';
import { DatabaseModule } from './database/database.module';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { CacheService } from './services';
export * from './common.module';

export type CommonModuleOptions = {
  serviceIdentifier: string;
  config?: ConfigModuleOptions;
};

@Global()
@Module({
  imports: [],
})
export class CommonModule {
  static register(options: CommonModuleOptions): DynamicModule {
    return {
      global: true,
      module: CommonModule,
      imports: [
        ConfigModule.forRoot({
          ...options?.config,
          isGlobal: true,
        }),
        ContextModule,
        DatabaseModule,
        LoggerModule,
        CacheModule.registerAsync({
          isGlobal: true,
          imports: [ConfigModule],
          useFactory: async (config: ConfigService) => {
            const store = await redisStore({
              socket: {
                host: config.get('cache.host'),
                port: config.get('cache.port'),
              },
            });
            return {
              store: {
                create: () => store as unknown as CacheStore,
              },
              ttl: config.get('cache.ttl'),
              db: config.get('cache.db'),
            };
          },
          inject: [ConfigService],
        }),
        WinstonModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: async (config: ConfigService) =>
            getWinstonParams(options.serviceIdentifier, config),
        }),
      ],
      providers: [],
      exports: [
        // CacheModule,
        // CacheService,
        ConfigModule,
        ContextModule,
        DatabaseModule,
        LoggerModule,
      ],
    };
  }
}
