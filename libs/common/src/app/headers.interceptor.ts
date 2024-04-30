import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';

import {
  HEADER_REQUEST_ID,
  HEADER_TIME_EXECUTE,
  HEADER_TIMESTAMP_ENTRY,
  HEADER_TIMESTAMP_EXIT,
} from '../common/constants';
import { LOGGER_SERVICE, LoggerService } from '../logger';
import { formatError } from '../utils/error';

const STATUS_URL = `/v1/status`;

interface ReqLogData {
  message: string;
  error?: { error: string; stack: string };
  url: string;
  method?: string;
  took: number;
  ip: string;
}

@Injectable()
export class HeadersInterceptor implements NestInterceptor {
  constructor(@Inject(LOGGER_SERVICE) private readonly logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const hostType = context.getType();
    if (hostType === 'http') {
      return this.interceptHttp(context, next);
    }

    return next.handle();
  }

  interceptHttp(context: ExecutionContext, next: CallHandler): Observable<any> {
    const entryTimestamp = Date.now();
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();

    this.setReqHeaders(request);

    return next.handle().pipe(
      tap({
        next: () => {
          //avoid tracing requests from EKS status checker
          if (request.originalUrl !== STATUS_URL) {
            this.logger.debug(this.getLogData(request, entryTimestamp));
          }
        },
        error: (err) => {
          this.logger.error(this.getLogData(request, entryTimestamp, err));
        },
        finalize: () => {
          const response = httpContext.getResponse<Response>();
          this.setResHeaders(request, response, entryTimestamp);
        },
      }),
    );
  }

  setReqHeaders(request: Request) {
    request[HEADER_REQUEST_ID] = request.header(HEADER_REQUEST_ID) || uuid();
  }

  setResHeaders(request: Request, response: Response, entryTimestamp: number) {
    const exitTimestamp = Date.now();
    response.header(HEADER_REQUEST_ID, request[HEADER_REQUEST_ID]);
    response.header(HEADER_TIMESTAMP_ENTRY, String(entryTimestamp));
    response.header(HEADER_TIMESTAMP_EXIT, String(exitTimestamp));
    response.header(HEADER_TIME_EXECUTE, String(exitTimestamp - entryTimestamp));
  }

  getLogData(request: Request, entryTimestamp: number, err?: Error): ReqLogData {
    const data: ReqLogData = {
      message: err != null ? 'Request failed' : 'Request completed',
      url: request.originalUrl,
      method: request.method,
      took: Date.now() - entryTimestamp,
      ip: request.ip,
    };
    if (err != null) data.error = formatError(err);

    return data;
  }
}
