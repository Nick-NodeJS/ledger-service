import { Inject, Injectable, LoggerService as NestLoggerService, LogLevel } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ContextService } from '../context/context.service';
import { LoggingContextInterface } from './utils';
import { formatError } from '../utils/error';

@Injectable()
export class LoggerService implements NestLoggerService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: NestLoggerService,
    private readonly contextService: ContextService,
  ) {}

  verbose(message: any, context?: string | LoggingContextInterface): any {
    const contextString = this.createContextString(context);
    return this.logger.verbose(this.getMessage(message, context), contextString);
  }

  debug(message: any, context?: string | LoggingContextInterface): any {
    const contextString = this.createContextString(context);
    return this.logger.debug(this.getMessage(message, context), contextString);
  }

  log(message: any, context?: string | LoggingContextInterface): any {
    const contextString = this.createContextString(context);
    return this.logger.log(this.getMessage(message, context), contextString);
  }

  warn(message: any, context?: string | LoggingContextInterface): any {
    const contextString = this.createContextString(context);
    return this.logger.warn(this.getMessage(message, context), contextString);
  }

  // TODO need deprecate trace use, and just send error in message
  error(error: any, stack?: string, context?: string | LoggingContextInterface): any {
    if (stack) {
      this.warn('Please discontinue use of stack argument in logger.error', {
        module: 'LoggerService',
      });
    }

    const contextString = this.createContextString(context);

    if ({}.hasOwnProperty.call(error, 'message') && {}.hasOwnProperty.call(error, 'stack')) {
      return this.logger.error(this.getMessage(error.message, context), error.stack, contextString);
    }

    return this.logger.error(this.getMessage(error, context), stack, contextString);
  }

  setLogLevels(levels: LogLevel[]) {
    this.logger.setLogLevels(levels);
  }

  private createContextString(context: string | LoggingContextInterface): string {
    if (!context) {
      return;
    }

    if (typeof context === 'string') {
      return context;
    }

    // Maps an object to [key1:value1][key2:value2]
    return `${Object.entries(context)
      .map((a) => a.join(':'))
      .join('=>')}`;
  }

  private createContextObject(context: string | LoggingContextInterface) {
    const logContext: { [key: string]: any } =
      typeof context === 'string' ? { name: context } : context ? context : {};

    return logContext;
  }

  private getMessage(message: any, context?: string | LoggingContextInterface) {
    const { requestId, url } = this.contextService.getRequestHeaders();

    const logData = {
      requestId,
      url,
      logTime: new Date().toISOString(),
      details: this.createContextObject(context),
    };

    if ('object' === typeof message) {
      // is error, or has error properties
      const isError =
        {}.hasOwnProperty.call(message, 'message') && {}.hasOwnProperty.call(message, 'stack');

      // has an 'error' field that is error like
      const isNestedError =
        message?.error &&
        {}.hasOwnProperty.call(message?.error, 'message') &&
        {}.hasOwnProperty.call(message?.error, 'stack');

      if (isError || isNestedError) {
        const error = formatError(isError ? message : message.error);
        Object.assign(logData, { ...message, ...error });
      } else {
        Object.assign(logData, message);
      }
    } else {
      Object.assign(logData, { message });
    }

    return logData;
  }
}
