import { NextFunction, Request, Response } from "express";
import { Evento } from "../../../models/entities/evento/Evento";
import { Database } from "../../../server/Database";

export class EventosApiController {
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {   
            const idUsuario = req.query.usuario_id;

            //@ts-ignore
            const eventos = await Database.em.find(Evento, { where: {
                creador: {id: idUsuario }
            }} );
            res.json(eventos);
        }
        catch (e) {
            next(e);
        }
    }

}