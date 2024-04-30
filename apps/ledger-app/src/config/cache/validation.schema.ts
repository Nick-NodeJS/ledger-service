import * as Joi from 'joi';

export const cacheValidationSchema = {
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_DB: Joi.number().default(1),
  REDIS_CACHE_TTL: Joi.number().default(900),
};
