import { NextFunction, Request, Response } from "express";
import { Asistente } from "../../../models/entities/asistencia/Asistente";
import { Evento } from "../../../models/entities/evento/Evento";
import { Participante } from "../../../models/entities/persona/Participante";
import { Rol } from "../../../models/entities/roles/Rol";
import { Database } from "../../../server/Database";
import { EventosApiController } from "../eventos/EventosApiController";
export class AsistentesApiController {

    constructor() {}

	public static async store(req: Request, res: Response, next: NextFunction) {
		try {
			const { asistentes } = req.body;
			const { id } = req.params;

			const existeEvento = await Database.em.findOneBy(Evento, { id });

			if (!existeEvento) {
				res.status(404).json( { msg: `Evento con id ${id} no encontrado` });
			}

			const asistentesInsertados = await AsistentesApiController.crearAsistentes(asistentes, id);

			res.status(201).json({
				asistentes: asistentesInsertados,
			}).send();
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
				res.status(404).json({
					msg: `Evento con id ${id} no existe`
				}).send();
			}

			const asistentesNuevos = asistentes.filter((asistente: Asistente) => !asistente.id);
			await AsistentesApiController.crearAsistentes(asistentesNuevos, id);

			const asistentesExistentes = await Database.em.findBy(Asistente, { evento: { id } });
			const asistentesNoEnviados = asistentesExistentes.filter(
				(asistenteExistente: Asistente) => {
					return (
						asistenteExistente.id !== null &&
						!asistentes.some((recurso: Asistente) => recurso.id === asistenteExistente.id)
					);
				}
			);
			await Database.em.remove(asistentesNoEnviados);

			const asistentesAModificar = asistentesExistentes.filter(
				(asistenteExistente: Asistente) => {
					return (
						asistenteExistente.id !== null &&
						asistentes.some((asistente: Asistente) =>asistente.id === asistenteExistente.id)
					);
				}
            );

			await AsistentesApiController.actualizarAsistentes(asistentesAModificar, asistentes);

			const asistentesInsertados = await Database.em.findBy(Asistente, {
				evento: { id }
			});

			res.json({
				asistentes: asistentesInsertados
			}).send();
		} catch (e) {
			next(e);
		}
	}

	private static asignarParametros(asistente: Asistente, params: any) {
		asistente.setEvento(params.evento);
		asistente.setParticipante(params.participante);
		asistente.setRol(params.rol);
	}

	private static async crearAsistentes(asistentes: any[], idEvento: string) {
        const asistentesInsertados: Asistente[] = [];
        for (const asistenteData of asistentes) {
            const asistente = new Asistente();
            asistenteData.evento = idEvento;

			const existeParticipante = await Database.em.findOneBy(Participante, {
				id: asistenteData.participante
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
			const asistenteData = asistentes.find((asistente: Asistente) => asistente.id === asistenteExistente.id);

			if (asistenteData) {
				AsistentesApiController.asignarParametros(
					asistenteExistente,
					asistenteData
				);
				await Database.em.save(asistenteExistente);
			}
		}
	}
}