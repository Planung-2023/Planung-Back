import { Request, Response } from "express";

export class WelcomeController {

  public static getWelcome(req: Request, res: Response) {

    res.json({
      say_hello: 'Hello TS!'
    });
  }

  public static getUsers(req: Request, res:Response){
    res.json({
      say_hello: "Está llegando a usuarios"
    });
  }
}
