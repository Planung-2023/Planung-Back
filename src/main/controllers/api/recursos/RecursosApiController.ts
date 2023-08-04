import { NextFunction, Request, Response } from "express";
import { Database } from "../../../server/Database";
import { Recurso } from "../../../models/entities/recursos/Recurso";

export class RecursosApiController {

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const idEvento = req.params.id;

            const recursos = await Database.em.find(Recurso, { where: {
                evento: {
                    id: idEvento
                }
            }});
            res.json(recursos);
        }
        catch (e) {
            next(e);
        }
    }
}