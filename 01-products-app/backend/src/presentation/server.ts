import path from 'node:path';
import express, { Application, Router } from "express";
import cors from 'cors';

interface ServerOptions { 
  port: number;
  public_path: string;
  routes: Router ;
}

export class Server {

  private readonly app: Application;
  private readonly public_path: string;
  private readonly port: number;
  private readonly routes: Router;
  private serverListening: any;

  constructor({ port, public_path, routes }: ServerOptions) {
    this.app = express();
    this.port = port;
    this.public_path = this.public_path;
    this.routes = routes;
  }

  async startServer(): Promise<void> {
    //* Middlewares
    this.app.use(cors({origin: 'http://localhost:4200'}));
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    //* Routes
    this.app.use('/api', this.routes);

    //* SPA
    this.app.get('*', (req, res) => {
      const indexHtml = path.join(__dirname + '../../../', this.public_path, '/index.html');
      return res.sendFile(indexHtml);
    });

    //* Start Server
    this.serverListening = this.app.listen(this.port, () => {
      console.log(`NodeJS Server started on port ${this.port}`);
    });
  }

  public close() {
    this.serverListening.close();
  }
}