import { Express } from "express";
import {WelcomeRoutes} from "./routers/WelcomeRoutes";

export class Router {

  constructor(private app: Express) {
    this.inicializar();
  }

  private inicializar() {
    this.app.use("/welcome", WelcomeRoutes.router);
  }
}
