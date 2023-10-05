import { NextFunction, Request, Response } from "express";
import { Permiso } from "../../../models/entities/roles/Permiso";
import { Database } from "../../../server/Database";

export class PermisoApiController{

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const permisos = await Database.em.find(Permiso);
            res.json(permisos);
        }
        catch (e) {
            next(e);
        }
    }
}