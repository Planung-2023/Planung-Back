import { NextFunction, Request, Response } from "express";
import { Evento } from "../../../models/entities/evento/Evento";
import { Ubicacion } from "../../../models/entities/otros/Ubicacion";
import { Database } from "../../../server/Database";
import { RecursosApiController } from "../recursos/RecursosApiController";
import { UbicacionApiController } from "../ubicacion/UbicacionApiController";
import { Asistente } from "../../../models/entities/asistencia/Asistente";
import { Participante } from "../../../models/entities/persona/Participante";
import { MoreThanOrEqual, LessThan, IsNull, Brackets } from "typeorm";


export class EventosApiController {
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const idUsuario = req.query.usuario_id;
            const eventoRepository = Database.em.getRepository(Evento);
            const eventos = await eventoRepository
            .createQueryBuilder("evento")
            .select([
                "evento"
            ])
            .innerJoin("evento.asistentes", "asistente")
            .innerJoin("asistente.participante", "participante")
            .innerJoin("participante.usuario", "usuario")
            .where("usuario.id = :idUsuario", { idUsuario })
            .andWhere("evento.fecha >= :fechaActual", { fechaActual: new Date() })
            .andWhere(
                new Brackets(qb => {
                    qb.where("evento.fecha > :fechaActual", { fechaActual: new Date() }) // Eventos después de la fecha actual
                        .orWhere("evento.horaInicio >= :horaActual", { horaActual: new Date() }); // Eventos en o después de la hora actual
                })
            )
            .getMany();;
        res.json(eventos);
        } catch (e) {
            next(e);
        }
    }
    public static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const eventos = await Database.em.findOneBy(Evento, {
                id: req.params.id,
            });

            if (eventos === null) {
                res.status(404);
                res.send();
                return;
            }
            res.json(eventos);
        } catch (e) {
            next(e);
        }
    }

    public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const { evento } = req.body;
            const { ubicacion } = evento;

            const ubicacionDb = new Ubicacion();
            UbicacionApiController.asignarParametros(ubicacionDb, ubicacion);
            await Database.em.save(ubicacionDb);

            const eventoDb = new Evento();
            eventoDb.setUbicacion(ubicacionDb);
            EventosApiController.asignarParametros(eventoDb!!, evento);

            await Database.em.save(eventoDb);
            RecursosApiController.crearRecursos(evento.recursos, eventoDb.id);

            res.status(201).send({
                evento: eventoDb,
            });
        } catch (e) {
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const eventos = await Database.em.findOneBy(Evento, {
                id: req.params.id,
            });

            if (eventos === null) {
                res.status(404);
                res.send();
                return;
            }

            EventosApiController.asignarParametros(eventos!!, req.body);

            await Database.em.save(eventos);

            res.status(200);
            res.send();
        } catch (e) {
            next(e);
        }
    }
    public static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const eventos = await Database.em.findOneBy(Evento, {
                id: req.params.id,
            });

            if (eventos === null) {
                res.status(404);
                res.send();
                return;
            }

            await Database.em.remove(eventos);
            res.status(200);
            res.send();
        } catch (e) {
            next(e);
        }
    }

    private static asignarParametros(evento: Evento, params: any) {
        evento.setNombre(params.nombre);
        evento.setFecha(params.fecha);
        evento.setEstadoEvento(params.estadoEvento ? params.estadoEvento : null);
        evento.setEventoAnterior(params.eventoAnterior ? params.eventoAnterior : null);
        evento.setEsVisible(params.esVisible);
        evento.setHoraInicio(params.horaInicio);
        evento.setHoraFin(params.horaFin ? params.horaFin : null);
        evento.setTipoEvento(params.tipoEvento ? params.tipoEvento : null);
        evento.setTipoInvitacion(params.tipoInvitacion ? params.tipoInvitacion : null);
        evento.setDescripcion(params.descripcion);
    }

    public static async findOneById(id: string) {
        const evento = await Database.em.findOneBy(Evento, { id });

        return evento;
    }

    public static formatHour(dateString: string) {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const miliseconds = date.getMilliseconds();

        return `${hours}:${minutes}:${miliseconds}`;
    }
}
