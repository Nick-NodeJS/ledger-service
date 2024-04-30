import { Global, Module } from '@nestjs/common';
import { LoggerService } from './logger.service';

export const LOGGER_SERVICE = 'APP_LOGGER_SERVICE';

@Global()
@Module({
  providers: [
    {
      provide: LOGGER_SERVICE,
      useClass: LoggerService,
    },
  ],
  exports: [LOGGER_SERVICE],
})
export class LoggerModule {}
