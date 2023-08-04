import { NextFunction, Request, Response } from "express";
import { Database } from "../../../server/Database";
import { Rol } from "../../../models/entities/roles/Rol";

export class PermisoApiController{

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const permisos = await Database.em.find(Rol);
            res.json(permisos);
        }
        catch (e) {
            next(e);
        }
    }
}