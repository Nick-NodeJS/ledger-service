import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  bodyLimit: process.env.BODY_LIMIT,
  urlLimit: process.env.URL_LIMIT,
  txInserChunk: +process.env.TX_INSERT_CHUNK,
}));
