import * as Joi from 'joi';
import { validationSchema as databaseValidationSchema } from './databases/validation.schema';
import { cacheValidationSchema } from './cache/validation.schema';

export const appValidationSchema = {
  SERVICE_HOST: Joi.string().required(),
  SERVICE_NAME: Joi.string().default('Ledger Service'),
  SERVICE_PORT: Joi.number().default(3000),
  BODY_LIMIT: Joi.string().default('1mB'),
  URL_LIMIT: Joi.string().default('300kB'),
  TX_INSERT_CHUNK: Joi.number().default(20),
};

export const validationSchema = Joi.object({
  ...appValidationSchema,
  ...cacheValidationSchema,
  ...databaseValidationSchema,
});

export const validationOptions = {
  abortEarly: false,
};
