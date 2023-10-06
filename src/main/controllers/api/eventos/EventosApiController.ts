import { NextFunction, Request, Response } from "express";
import { Evento } from "../../../models/entities/evento/Evento";
import { Database } from "../../../server/Database";

export class EventosApiController {
    // TODO: Crear o injectar en el constructor el repositorio de eventos asi no se repite el codigo de
    // getRepository cada vez que lo tengamos que usar, y todo el Controller tiene el repository

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {   
            const idUsuario = req.query.usuario_id;
            const eventoRepository = Database.em.getRepository("evento")
            const eventos = await eventoRepository
				.createQueryBuilder("evento")
                .select(["evento", "ubicacion", "usuario.id", "usuario.nombreUsuario"])
                .addSelect("eventoAnterior")
                .where("evento.creador.id = :idUsuario", { idUsuario })
                .leftJoin("evento.ubicacion", "ubicacion")
                .leftJoin("evento.creador", "usuario")
                .leftJoin("evento.eventoAnterior", "eventoAnterior")
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
            const evento = new Evento();

            EventosApiController.asignarParametros(evento!!, req.body);

            await Database.em.save(evento);

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
		evento.setRecursos(params.recursos); // No va. RecursosController.  /eventos/1/recursos/ POST body
		evento.setUbicacion(params.ubicacion); // No va. UbicacionController
		evento.setFechaHora(params.fechaHora);
		evento.setEstadoEvento(params.estadoEvento);
		evento.setEventoAnterior(params.eventoAnterior);
		evento.setAsistentes(params.asistentes); // No va. AsistentesController. /eventos/1/asistentes/ POST
		evento.setEsVisible(params.esVisible);
	}
    
    public static async findOneById(id: string) {
        const evento = await Database.em.findOneBy(Evento, { id });

        return evento;
    }
}
