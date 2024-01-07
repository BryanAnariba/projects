import "reflect-metadata"
import { envs } from "./config/envs";
import { AppDataSource } from "./config/data-source";
import { AppRoutes } from "./presentation/app.routes";
import { Server } from "./presentation/server";

(async () => {
  await main();
})()

async function main() {
  try {
    const server = new Server({port: envs.PORT, public_path: envs.PUBLIC_PATH, routes: AppRoutes.routes});
    await server.startServer();
    await AppDataSource.initialize();
  } catch (error) {
    throw error;
  }
}