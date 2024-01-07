import { DataSource } from "typeorm"
import path from 'node:path';
import { envs } from "./envs"
import { Category, Product } from "./entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.POSTGRES_HOST,
  port: envs.POSTGRES_PORT,
  username: envs.POSTGRES_USER,
  password: envs.POSTGRES_PASSWORD,
  database: envs.POSTGRES_DB,
  synchronize: false,
  migrationsRun: true,
  logging: true,
  entities: [
    Category, 
    Product
  ],
  migrations: [path.resolve('./src/config/migration/*.ts')],
  subscribers: [],
});
