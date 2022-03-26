import { ConnectionOptions } from 'typeorm';

export const testDatabaseCredential: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TEST_POSTGRES_HOST,
  port: +process.env.TEST_POSTGRES_PORT,
  username: process.env.TEST_POSTGRES_USERNAME,
  password: process.env.TEST_POSTGRES_PASSWORD,
  database: process.env.TEST_POSTGRES_DATABASE,
  synchronize: true,
  entities: ['src/entity/**/*.ts']
};
