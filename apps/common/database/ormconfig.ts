console.log('Debug...');
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config({ path: `${__dirname}/../../../.env` });

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  schema: process.env.POSTGRES_SCHEMA,
  synchronize: process.env.POSTGRES_SYNC === 'true',
  logging: process.env.POSTGRES_LOGGING === 'true',
  entities: [`${__dirname}/../../../libs/common/src/database/entities/*{.ts,.js}`],
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
  namingStrategy: new SnakeNamingStrategy(),
};

const dataSource = new DataSource(config);

export default dataSource;