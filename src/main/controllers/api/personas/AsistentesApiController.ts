import { NextFunction, Request, Response } from "express";
import { Asistente } from "../../../models/entities/asistencia/Asistente";
import { Evento } from "../../../models/entities/evento/Evento";
import { Participante } from "../../../models/entities/persona/Participante";
import { Usuario } from "../../../models/entities/persona/Usuario";
import { Rol } from "../../../models/entities/roles/Rol";
import { Database } from "../../../server/Database";
import { getAuthUser } from "../../helpers/GetAuthUser";
import { EventosApiController } from "../eventos/EventosApiController";
import { ParticipantesApiController } from "./ParticipantesApiController";
export class AsistentesApiController {
    constructor() {}

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const evento = await EventosApiController.findOneById(id);
            if (!evento) {
                return res.status(404).json({ msg: `Evento con id ${id} no encontrado` });
            }

            const asistentes = await Database.em.findBy(Asistente, { evento: { id } });

            return res.json(asistentes);
        } catch (e) {
            next(e);
        }
    }

    public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const { asistentes } = req.body;
            const { id } = req.params;

            const existeEvento = await Database.em.findOneBy(Evento, { id });

            if (!existeEvento) {
                res.status(404).json({ msg: `Evento con id ${id} no encontrado` });
            }

            const asistentesInsertados = await AsistentesApiController.crearAsistentes(
                asistentes,
                id,
            );

            res.status(201)
                .json({
                    asistentes: asistentesInsertados,
                })
                .send();
        } catch (e) {
            res.status(500).json({ msg: "Server error" });
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { asistentes } = req.body;

            const evento = await EventosApiController.findOneById(id);

            if (!evento) {
                res.status(404)
                    .json({
                        msg: `Evento con id ${id} no existe`,
                    })
                    .send();
            }

            const asistentesNuevos = asistentes.filter((asistente: Asistente) => !asistente.id);
            await AsistentesApiController.crearAsistentes(asistentesNuevos, id);

            const asistentesExistentes = await Database.em.findBy(Asistente, { evento: { id } });
            const asistentesNoEnviados = asistentesExistentes.filter(
                (asistenteExistente: Asistente) => {
                    return (
                        asistenteExistente.id !== null &&
                        !asistentes.some(
                            (recurso: Asistente) => recurso.id === asistenteExistente.id,
                        )
                    );
                },
            );
            await Database.em.remove(asistentesNoEnviados);

            const asistentesAModificar = asistentesExistentes.filter(
                (asistenteExistente: Asistente) => {
                    return (
                        asistenteExistente.id !== null &&
                        asistentes.some(
                            (asistente: Asistente) => asistente.id === asistenteExistente.id,
                        )
                    );
                },
            );

            await AsistentesApiController.actualizarAsistentes(asistentesAModificar, asistentes);

            const asistentesInsertados = await Database.em.findBy(Asistente, {
                evento: { id },
            });

            res.json({
                asistentes: asistentesInsertados,
            }).send();
        } catch (e) {
            next(e);
        }
    }

    public static async getAsistenteById(req: Request, res: Response, next: NextFunction) {
        try {
            const eventoId = req.params.id;
            const asistenteId = req.params.idAsistente;

            const evento = await EventosApiController.findOneById(eventoId);

            if (!evento) {
                res.status(404);
                return;
            }

            const asistente = await Database.em.findOne(Asistente, {
                where: {
                    id: asistenteId,
                    evento: { id: eventoId },
                },
            });

            if (!asistente) {
                res.status(404)
                    .json({
                        msg: `Asistente con id ${asistenteId} no existe`,
                    })
                    .send();
            }
            return res.json(asistente);

            res.status(200);
        } catch (e) {
            next(e);
        }
    }

    public static async removeAsistenteById(req: Request, res: Response, next: NextFunction) {
        try {
            const asistenteId = req.params.id;

            const asistente = await Database.em.findOne(Asistente, {
                where: {
                    id: asistenteId,
                },
            });

            if (!asistente) {
                res.status(404)
                    .json({
                        msg: `Asistente con id ${asistenteId} no existe`,
                    })
                    .send();

            }
            await Database.em.remove(asistente);

            res.status(200).json({ asistente }).send();
        } catch (e) {
            next(e);
        }
    }
    

    public static async unirseEvento(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = await getAuthUser(req);
            const { idEvento } = req.params;
            const participante = await ParticipantesApiController.findOneByMail(email);

            const evento = await EventosApiController.findOneById(idEvento);

            if (!evento)
                return res
                    .status(404)
                    .json({ msg: `Evento con id ${idEvento} no encontrado` })
                    .send();

            const asistenteBody = {
                activo: true,
                evento: idEvento,
                participante: participante!.id,
                esAdministrador: false,
                estaAceptado: evento!.tipoInvitacion == "Directa" ? true : false,
            };

            const asistenteDb = new Asistente();
            AsistentesApiController.asignarParametros(asistenteDb, asistenteBody);

            await Database.em.save(asistenteDb);

            return res
                .json({ msg: asistenteBody.estaAceptado ? "Aceptado" : "Esperando aceptacion" })
                .status(201)
                .send();
        } catch (error) {
            next(error);
        }
    }

    public static async aceptarAsistente(req: Request, res: Response, next: NextFunction) {
        try {
            const { idEvento } = req.params;
            const usuario = await getAuthUser(req);
            if (!(await EventosApiController.findOneById(idEvento)))
                return res.status(404).json({ msg: "Evento not found" });

            const idAsistente = req.query["asistente_id"] as string;
            const asistenteDb = await Database.em.findOneBy(Asistente, { id: idAsistente });
            if (!asistenteDb) return res.status(404).json({ msg: "Asistente not found" });

            const asistenteAdmin = await AsistentesApiController.getAsistenteAdministrador(
                usuario,
                idEvento,
            );
            if (!asistenteAdmin) res.status(401).json({ msg: `No autorizado` }).send();

            asistenteDb?.setEstaAceptado(true);

            await Database.em.save(asistenteDb);

            return res.json({ asistenteDb }).send();
        } catch (error) {
            next(error);
        }
    }

    public static async rechazarAsistente(req: Request, res: Response, next: NextFunction) {
        try {
            const { idEvento } = req.params;
            const usuario = await getAuthUser(req);
            if (!(await EventosApiController.findOneById(idEvento)))
                return res.status(404).json({ msg: "Evento not found" });

            const idAsistente = req.query["asistente_id"] as string;
            const asistenteDb = await Database.em.findOneBy(Asistente, { id: idAsistente });
            if (!asistenteDb) return res.status(404).json({ msg: "Asistente not found" });

            const asistenteAdmin = await AsistentesApiController.getAsistenteAdministrador(
                usuario,
                idEvento,
            );
            if (!asistenteAdmin) res.status(401).json({ msg: `No autorizado` }).send();

            asistenteDb.setActivo(false);
            asistenteDb.setEstaAceptado(false);
            await Database.em.save(asistenteDb);

            return res.json({ eliminado: true, asistenteDb }).send();
        } catch (error) {
            next(error);
        }
    }

    public static async crearAsistenteAdmin(evento: Evento, participante: Participante) {
        const asistente = new Asistente();
        const params = {
            activo: true,
            evento: evento,
            participante,
            esAdministrador: true,
            estaAceptado: true,
        };
        AsistentesApiController.asignarParametros(asistente, params);
        await Database.em.save(asistente);
    }

    private static asignarParametros(asistente: Asistente, params: any) {
        asistente.setActivo(params.activo);
        asistente.setEvento(params.evento);
        asistente.setParticipante(params.participante);
        asistente.setRol(params.rol);
        asistente.setEsAdministrador(params.esAdministrador);
        asistente.setEstaAceptado(params.estaAceptado);
    }

    private static async crearAsistentes(asistentes: any[], idEvento: string) {
        const asistentesInsertados: Asistente[] = [];
        for (const asistenteData of asistentes) {
            const asistente = new Asistente();
            asistenteData.evento = idEvento;

            const existeParticipante = await Database.em.findOneBy(Participante, {
                id: asistenteData.participante,
            });

            const existeRol = await Database.em.findOneBy(Rol, {
                id: asistenteData.rol,
            });

            if (existeParticipante != null && existeRol != null) {
                AsistentesApiController.asignarParametros(asistente!!, asistenteData);
                await Database.em.save(asistente);

                asistentesInsertados.push(asistente);
            }
        }
        return asistentesInsertados;
    }

    private static async actualizarAsistentes(asistentesAModificar: any[], asistentes: any[]) {
        for (const asistenteExistente of asistentesAModificar) {
            const asistenteData = asistentes.find(
                (asistente: Asistente) => asistente.id === asistenteExistente.id,
            );

            if (asistenteData) {
                AsistentesApiController.asignarParametros(asistenteExistente, asistenteData);
                await Database.em.save(asistenteExistente);
            }
        }
    }

    public static async getAsistenteAdministrador(usuario: Usuario, eventoId: string) {
        const participante = await ParticipantesApiController.findOneByMail(usuario.email);

        const asistente = await Database.em.findOne(Asistente, {
            where: {
                participante: { id: participante!.id },
                esAdministrador: true,
                evento: { id: eventoId },
            },
        });

        return asistente;
    }
}
