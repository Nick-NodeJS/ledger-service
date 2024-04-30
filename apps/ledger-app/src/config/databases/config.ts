import { registerAs } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const config = registerAs('database', () => ({
  autoLoadEntities: true,
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  synchronize: JSON.parse(process.env.POSTGRES_SYNC),
  schema: process.env.POSTGRES_SCHEMA,
  logging: JSON.parse(process.env.POSTGRES_LOGGING),
  entities: [`${__dirname}/../../../../../../**/*.entity{.ts,.js}`],
  migrations: [
    `${__dirname}/../../../../../common/database/migrations/*{.ts,.js}`,
  ],
  namingStrategy: new SnakeNamingStrategy(),
  applicationName: 'ledger-service',
}));
