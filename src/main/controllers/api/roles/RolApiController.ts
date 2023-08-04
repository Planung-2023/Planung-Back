import { NextFunction, Request, Response } from "express";
import { Database } from "../../../server/Database";
import { Rol } from "../../../models/entities/roles/Rol";

export class RolApiController{
    
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const roles = await Database.em.find(Rol);
            res.json(roles);
        }
        catch (e) {
            next(e);
        }
    }

}