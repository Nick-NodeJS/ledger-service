import { registerAs } from '@nestjs/config';

export const cacheConfig = registerAs('cache', () => ({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT,
  db: +process.env.REDIS_DB,
  ttl: +process.env.REDIS_CACHE_TTL,
}));
