import { NextFunction, Request, Response } from 'express';
import { Participante } from '../../../models/entities/persona/Participante';
import { Database } from '../../../server/Database';

export class ParticipantesApiController {
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const participantes = await Database.em.find(Participante);
            res.json(participantes);
        } catch (e) {
            next(e);
        }
    }

    public static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const participante = await Database.em.findOneBy(Participante, {
                id: req.params.id,
            });

            if (participante === null) {
                res.status(404);
                res.send();
                return;
            }
            res.json(participante);
        } catch (e) {
            next(e);
        }
    }

    public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const participante = new Participante();

            ParticipantesApiController.asignarParametros(participante!!, req.body);

            await Database.em.save(participante);

            res.status(200);
            res.send();
        } catch (e) {
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const participante = await Database.em.findOneBy(Participante, {
                id: req.params.id,
            });

            if (participante === null) {
                res.status(404);
                res.send();
                return;
            }

            ParticipantesApiController.asignarParametros(participante!!, req.body);

            await Database.em.save(participante);

            res.status(200);
            res.send();
        } catch (e) {
            next(e);
        }
    }

    public static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const participante = await Database.em.findOneBy(Participante, {
                id: req.params.id,
            });

            if (participante === null) {
                res.status(404);
                res.send();
                return;
            }

            await Database.em.remove(participante);
            res.status(200);
            res.send();
        } catch (e) {
            next(e);
        }
    }

    public static async getParticipante(req: Request, res: Response, next: NextFunction) {
        try {
            const id = await Database.em.findOneBy(Participante, {
                id: req.params.id,
            });
            if (id === null) {
                res.status(404);
                res.send();
                return;
            }
            res.json(id);
        } catch (e) {
            next(e);
        }
    }

    private static asignarParametros(participante: Participante, params: any) {
        participante.setApellido(params.apellido);
        participante.setNombre(params.nombre);
        participante.setMail(params.mail);
        participante.setUsuario(params.usuario);
    }
}
