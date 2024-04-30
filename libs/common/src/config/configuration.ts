import { config } from 'dotenv';
import { join } from 'path';

import { ConfigFactory, ConfigModuleOptions } from '@nestjs/config';

import { createLogger } from '../logger/winston';

// TODO add dependencies from env names as new string enum literal?
const envFiles = [
  '.env.development.local',
  '.env.development',
  '.env.production.local',
  '.env.production',
  '.env',
];

const envFilePath = (folder: string, file: string): string =>
  join(folder, file);

let dotEnvInitiated = false;

const dotEnvInit = (folder: string): void => {
  for (const fileName of envFiles) {
    const path = envFilePath(folder, fileName);
    config({ path });
  }
};

export const ensureDotEnvInitiated = (folder: string): void => {
  if (!dotEnvInitiated) {
    dotEnvInit(folder);
  }
  dotEnvInitiated = true;
};

export interface Config {
  envFileDir: string;
  validationSchema?: any;
  validationOptions: Record<string, any>;
  load?: ConfigFactory[];
}

export const configuration = ({
  envFileDir,
  validationSchema,
  validationOptions,
  load,
}: Config): ConfigModuleOptions => ({
  cache: true,
  isGlobal: true,
  load,
  envFilePath: envFiles.map((file) => envFilePath(envFileDir, file)),
  validationSchema: validationSchema,
  validationOptions: validationOptions,
  validate: (record): ConfigModuleOptions['validate'] => {
    // console.log(`\nenvFileDir: ${envFileDir}\n`);
    const { error, value: validatedConfig } = validationSchema.validate(
      record,
      {
        allowUnknown: true,
        ...validationOptions,
      },
    );
    if (error) {
      // NOTE: Environment variables validation failed, service will crash
      // We try to log as much information as possible
      try {
        const logger = createLogger(envFileDir);
        logger.error(
          `Config validation error: ${error.message}`,
          null,
          'Config validation',
        );
      } catch (loggerError) {
        console.error('Config validation error:', error); // eslint-disable-line no-console
      }

      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedConfig;
  },
});

export default configuration;
