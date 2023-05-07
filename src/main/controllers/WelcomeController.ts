import { Request, Response } from "express";

export class WelcomeController {

  public static getWelcome(req: Request, res: Response) {

    res.json({
      say_hello: 'Hello TS!'
    });
  }
}
