import { join } from 'path';

import * as winston from 'winston';
import * as Transport from 'winston-transport';

import { LoggerService } from '@nestjs/common';
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';
import { ensureDotEnvInitiated } from '../config/configuration';

export const createLogger = (workFolder?: string): LoggerService => {
  // NOTE: We should use .env initialization for logger as config service is not yet available
  // We should have logger before config validation as otherwise we cannot log it to CW
  if (workFolder) ensureDotEnvInitiated(workFolder);

  const config: LogConfig = {
    serviceName: process.env.SERVICE_NAME,
    level: process.env.LOG_LEVEL,
    defaultMeta: { env: process.env.ENV, service: process.env.SERVICE_NAME },
  };
  if (workFolder && process.env.LOG_ERROR_FILE)
    config.logErrorFile = join(workFolder, process.env.LOG_ERROR_FILE);
  if (workFolder && process.env.LOG_COMBINED_FILE)
    config.logCombineLog = join(workFolder, process.env.LOG_COMBINED_FILE);

  return WinstonModule.createLogger(winstonParams(config));
};

export type LogConfig = {
  logErrorFile?: string;
  logCombineLog?: string;
  serviceName: string;
  level?: string;
  defaultMeta?: Record<string, any>;
};

const createBaseTransports = (
  logErrorFile?: string,
  logCombineLog?: string,
): Transport[] => {
  const transports: Transport[] = [
    //Array<FileTransportInstance | ConsoleTransportInstance>
    new winston.transports.Console({
      format:
        Boolean(process.env.LOG_IN_JSON) &&
        process.env.LOG_IN_JSON.toLowerCase() === 'true'
          ? winston.format.json()
          : // NestJS console like logs
            winston.format.combine(
              winston.format.timestamp(),
              utilities.format.nestLike(),
            ),
    }),
  ];
  // - Write all logs with level `error` and below to `error.log`
  logErrorFile &&
    transports.push(
      new winston.transports.File({ level: 'error', filename: logErrorFile }),
    );
  // - Write all logs with level `info` and below to `combined.log`
  logCombineLog &&
    transports.push(new winston.transports.File({ filename: logCombineLog }));

  return transports;
};

export const winstonParams = ({
  logErrorFile,
  logCombineLog,
  serviceName,
  level = 'info',
  defaultMeta,
}: LogConfig): WinstonModuleOptions => {
  const transports: Transport[] = createBaseTransports(
    logErrorFile,
    logCombineLog,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const infoFormat = winston.format(<T>(info, _opts) => {
    const reqId = info.reqId || undefined;
    if (reqId) {
      info.meta = {
        reqId,
      };
    }
    return info as T;
  });

  return {
    level: level,
    format: winston.format.combine(infoFormat(), winston.format.json()),
    defaultMeta: Object.assign({ service: serviceName }, defaultMeta),
    transports,
  };
};
