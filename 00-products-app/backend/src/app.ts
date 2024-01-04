import "reflect-metadata";
import { envs } from "./config/env.var";
import { Server } from "./presentation/server"
import { AppDataSource } from './data/data-source';

(async () => {
  await main();
})()

async function main (): Promise<void> {
  try {
    const server = new Server({port: envs.PORT, publicRoutes: envs.PUBLIC_PATH});
    await server.start();
    await AppDataSource.initialize();
  } catch (error) {
    throw new Error(`${error}`);
  }
}