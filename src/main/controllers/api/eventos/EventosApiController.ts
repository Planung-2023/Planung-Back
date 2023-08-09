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
    public static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const eventos= await Database.em.findOneBy(Evento, {
                id: req.params.id
            });

            if(eventos === null) {
                res.status(404);
                res.send();
                return;
            }
            res.json(eventos);
        }
        catch (e) {   
            next(e);
        }

    }
    public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const eventos = new Evento();

            EventosApiController.asignarParametros(eventos!!, req.body);

            await Database.em.save(eventos);

            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }
    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const eventos = await Database.em.findOneBy(Evento, {
                id: req.params.id
            });

            if(eventos === null) {
                res.status(404);
                res.send();
                return;
            }

            EventosApiController.asignarParametros(eventos!!, req.body);

            await Database.em.save(eventos);

            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }
    public static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const eventos = await Database.em.findOneBy(Evento, {
                id: req.params.id
            });

            if(eventos === null) {
                res.status(404);
                res.send();
                return;
            }

            await Database.em.remove(eventos);
            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    
    }
    
    private static asignarParametros(evento: Evento, params: any) {
        evento.setNombre(params.nombre);
        evento.setRecursos(params.recursos);
        evento.setUbicacion(params.ubicacion);
        evento.setFechaHora(params.fechaHora);
        evento.setEstadoEvento(params.estadoEvento);
        evento.setEventoAnterior(params.eventoAnterior);
        evento.setAsistentes(params.asistentes);
        evento.setEsVisible(params.esVisible);
    }
}
