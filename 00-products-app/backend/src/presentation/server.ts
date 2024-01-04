import path from 'node:path';
import express, { Application } from "express";
import cors from 'cors';
import { AppRoutes } from "./app.routes";

interface ServerOptions {
  port: number;
  publicRoutes: string;
}

export class Server {

  private port: number;
  private app!: Application;
  private publicRoutes: string;
  public serverListening: any;

  constructor ({port, publicRoutes}: ServerOptions) {
    this.app = express();
    this.port = port;
    this.publicRoutes = publicRoutes;
  }

  public async start(): Promise<void> {
    //* Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    //* Routes
    this.app.use('/api', AppRoutes.routes);

    //* SPA
    this.app.get('*', (req, res) => {
      const indexHtml = path.join(__dirname + `../../../${this.publicRoutes}/index.html`);
      res.sendFile(indexHtml);
    });

    //* Start Server
    this.serverListening = this.app.listen(this.port, () => {
      console.log(`NodeJS Server started on port: ${this.port}`);
    });
  }

  public disconnectServer () {
    this.serverListening.close();
  }
}