import { DataSource } from 'typeorm';
import { envs } from '../config/env.var';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: envs.POSTGRES_HOST,
  port: envs.POSTGRES_PORT,
  username: envs.POSTGRES_USER,
  password: envs.POSTGRES_PASSWORD,
  database: envs.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: [],
});