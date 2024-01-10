import path from "node:path";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { envs } from "./env.var";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: envs.POSTGRES_HOST,
    port: envs.POSTGRES_PORT,
    username: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    database: envs.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: [path.resolve('./src/config/entity/*.ts')],
    migrations: [path.resolve('./src/config/migration/*.ts')],
    subscribers: [],
});