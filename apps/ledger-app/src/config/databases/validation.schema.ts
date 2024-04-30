import * as Joi from 'joi';

export const validationSchema = {
  POSTGRES_HOST: Joi.string().default('localhost'),
  POSTGRES_PORT: Joi.number().default(5432),
  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_USERNAME: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_SYNC: Joi.boolean().default(false),
  POSTGRES_LOGGING: Joi.boolean().default(false),
  POSTGRES_SCHEMA: Joi.string().default('public'),
};
