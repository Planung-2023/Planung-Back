import { NextFunction, Request, Response } from "express";
import { Evento } from "../../../models/entities/evento/Evento";
import { Database } from "../../../server/Database";

export class EventosApiController {
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {   
            const idUsuario = req.query.usuario_id;
            const eventoRepository = Database.em.getRepository("evento")
            
            /* El select en el query builder va a seleccionar los campos que queramos (si no ponemos el . despues de la entidad, trae todo)
                Aca por ejemplo excluimos la contraseña
                En el where indico las propiedades de Typescript, el evento.creador.id, que sea igual al parametro
                Luego hago un leftJoin de las dos tablas, indicando primero la relacion y luego el nombre de la entidad de referencia
            */
            const eventos = await eventoRepository
				.createQueryBuilder("evento")
                .select(["evento", "ubicacion", "usuario.id", "usuario.nombreUsuario"])
                .where("evento.creador.id = :idUsuario", { idUsuario })
                .leftJoin("evento.ubicacion", "ubicacion")
                .leftJoin("evento.creador", "usuario")
				.getMany();;
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
