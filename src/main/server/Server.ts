import { Router } from "../routes/Router";
import express, { Express } from 'express';
const dotenv = require("dotenv");
dotenv.config();

export class Server {
  private app: Express;
  private router: Router;

  constructor(
    private puerto: number | string = 3000,
    private host: string = "localhost"
  ) {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.router = new Router(this.app);
  }

  public async up() {
    await this.app.listen(this.puerto);
    console.log(
      `[server]: Server is running at http://${this.host}:${this.puerto}`
    );
  }
}
