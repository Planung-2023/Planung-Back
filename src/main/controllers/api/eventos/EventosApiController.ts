import { NextFunction, Request, Response } from "express";
import { Evento } from "../../../models/entities/evento/Evento";
import { Ubicacion } from "../../../models/entities/otros/Ubicacion";
import { Database } from "../../../server/Database";
import { RecursosApiController } from "../recursos/RecursosApiController";
import { UbicacionApiController } from "../ubicacion/UbicacionApiController";
import { Asistente } from "../../../models/entities/asistencia/Asistente";
import { Participante } from "../../../models/entities/persona/Participante";


//con el id de usuario. Primero obtener el participante, con el participante, en la tabla asistente, 
//todos los id evento donde el participante id es el usuario
//Cada Asistente tiene un evento_id y un participante_id. Cada participante tiene un usuario_id. Cada usuario tiene un id. 
//Pero cada evento tiene un usuario_id. Crear un queryBuilder en el que devuelva los eventos a los que pertenece cada usuario 
export class EventosApiController {
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const idUsuario = req.query.usuario_id as string;
            const participante = await Database.em.findOneBy(Participante, { usuario: { id: idUsuario } })
            const idParticipante= participante?.id;
            const asistente = await Database.em.findOneBy(Asistente, { participante: { id: participante?.id } })
            const idAsistente = asistente?.id;
            const eventoRepository = Database.em.getRepository("evento");
            const eventos = await eventoRepository
                .createQueryBuilder("evento")
                //"participante.usuario.id", "asistente.id"
                .select(["evento", "ubicacion", "usuario.id", "usuario.nombreUsuario"])
                .addSelect("eventoAnterior")
                //.where("evento.creador.id = :idUsuario", { idUsuario })
                .where(":idUsuario= :participanteId", { idUsuario, idParticipante })
                .andWhere(":idParticipante=:idAsistente", {idParticipante, idAsistente})
                .andWhere()
                //.leftJoin("")
                .leftJoin("evento.ubicacion", "ubicacion")
                .leftJoin("evento.creador", "usuario")
                .leftJoin("evento.eventoAnterior", "eventoAnterior")
                .getMany();
            res.json(
                eventos
            );
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
