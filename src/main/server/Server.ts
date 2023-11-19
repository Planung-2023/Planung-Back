import { createServer } from "http";
import { Router } from "../routes/Router";
import express, { Express } from 'express';
import cors from 'cors';
const dotenv = require("dotenv");
dotenv.config();

export class Server {
  private app: Express;
  private router: Router;
  private httpServer: any;

  constructor(
      private puerto: number | string = 8000,
      private host: string = "0.0.0.0"
  ) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.router = new Router(this.app);
    this.httpServer = createServer(this.app);
  }

  public gethttpServer () {
    return this.httpServer
  }

  public async up() {
    await this.httpServer.listen(this.puerto, this.host);
    console.log(
        'Servidor levantado en ' +
        this.host +
        ' y escuchando en el puerto ' +
        this.puerto +
        `[server]: Server is running at http://${this.host}:${this.puerto}`
    );
  }
}
