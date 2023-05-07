import { Router } from "express";
import { WelcomeController } from "../../controllers/WelcomeController";

export class WelcomeRoutes {
  public static router: Router;

  static {
    this.router = Router();

    //DEFINED ROUTES

    this.router.get("", WelcomeController.getWelcome);
    this.router.get("/usuarios", WelcomeController.getUsers)
  }
}
