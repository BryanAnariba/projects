import { Server } from "./presentation/server";
import { AppDataSource, envs } from "./config";
import { AppRoutes } from "./presentation/app.routes";

(async () => {
  await main();
})()

async function main() {
  try {
    const server = new Server({port: envs.PORT, static_files_path: envs.STATIC_FILES_PATH, appRoutes: AppRoutes.routes});
    const appDataSource = AppDataSource;
    await server.startServer();
    await appDataSource.initialize();
  } catch (error) {
    throw new Error(`Error: ${error}`);
  }
}