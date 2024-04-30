import { join } from 'path';
import { config as databaseConfig } from './databases/config';
import * as validations from './env.validation';
import { appConfig } from './app.config';
console.log('ENVPATH ', join(__dirname, '../../../'), __dirname)
const config = {
  envFileDir: join(__dirname, '../../../'),
  ...validations,
  load: [appConfig, databaseConfig],
};

export default config;
