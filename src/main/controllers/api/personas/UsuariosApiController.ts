import { NextFunction, Request, Response } from "express";
import { Usuario } from "../../../models/entities/persona/Usuario";
import { Database } from "../../../server/Database";

export class UsuariosApiController {

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const usuarios = await Database.em.find(Usuario);
            res.json(usuarios);
        }
        catch (e) {
            next(e);
        }
    }

    public static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const usuarios= await Database.em.findOneBy(Usuario, {
                id: req.params.id
            });

            if(usuarios === null) {
                res.status(404);
                res.send();
                return;
            }
            res.json(usuarios);
        }
        catch (e) {
            next(e);
        }


    }

    public static async store(req: Request, res: Response, next: NextFunction) {
        //TODO
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        //TODO
    }

    public static async remove(req: Request, res: Response, next: NextFunction) {
        //TODO
    }
}