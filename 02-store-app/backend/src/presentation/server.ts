import path from 'node:path';
import express, { Application, Router, json, urlencoded } from "express";
import cors from 'cors';

interface ServerOptions {
  port: number;
  static_files_path: string;
  appRoutes: Router;
}

export class Server {

  private readonly app: Application;
  private readonly port: number;
  private readonly static_files_path: string;
  private readonly appRoutes: Router;

  constructor ({port, static_files_path, appRoutes}: ServerOptions) {
    this.app = express();
    this.port = port;
    this.port = port;
    this.appRoutes = appRoutes;
    this.static_files_path = static_files_path;
  }

  public async startServer(): Promise<void> {
    //* Middlewares
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({extended: true}));

    //* Routes
    this.app.use('/api/v1', this.appRoutes);

    //* Static Files
    this.app.use('/uploads', express.static(__dirname + '../../../uploads'));

    //* SPA
    this.app.get('*', (req, res) => {
      const staticFilesIndexPath = path.join(`${__dirname}../../../${this.static_files_path}/index.html`);
      res.sendFile(staticFilesIndexPath);
    });

    //* Start
    this.app.listen(this.port, () => {
      console.clear();
      console.log(`NodeJS Server Started on port: ${this.port}`);
    });
  }
}