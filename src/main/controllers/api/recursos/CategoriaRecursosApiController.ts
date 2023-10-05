import { Request, Response, NextFunction } from "express";
import { Database } from "../../../server/Database";
import { Recurso } from "../../../models/entities/recursos/Recurso";

export class CategoriaRecursosApiController{
    public static async index(req:Request, res:Response,next:NextFunction){
        try {
            const idEvento = req.params.id;

            const recursos = await Database.em.find(Recurso);
            res.json(recursos);
        }
        catch (e) {
            next(e);
        }
    }

}