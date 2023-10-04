import { NextFunction, Request, Response } from "express";
import { Asistente } from "../../../models/entities/asistencia/Asistente";
import { Evento } from "../../../models/entities/evento/Evento";
import { Participante } from "../../../models/entities/persona/Participante";
import { Rol } from "../../../models/entities/roles/Rol";
import { Database } from "../../../server/Database";
export class AsistentesApiController {

    constructor() {}

	public static async store(req: Request, res: Response, next: NextFunction) {
		try {
			const { asistentes } = req.body;
			const { id } = req.params;

			const existeEvento = await Database.em.findOneBy(Evento, { id });

			if (!existeEvento) {
				return res.status(404);
			}

			const asistentesInsertados: Asistente[] = [];

			for (const asistenteData of asistentes) {
				const asistente = new Asistente();

				const existeParticipante = await Database.em.findOneBy(
					Participante,
					{ id: asistenteData.participante }
				);
				const existeRol = await Database.em.findOneBy(Rol, {
					id: asistenteData.rol,
				});

				if (existeParticipante != null && existeRol != null) {
					asistenteData.evento = +id;
					AsistentesApiController.asignarParametros(
						asistente,
						asistenteData
					);
					await Database.em.save(asistente);
					asistentesInsertados.push(asistente);
				}
			}

			res.status(201).json({
				asistentes: asistentesInsertados,
			});
			res.send();
		} catch (e) {
			next(e);
		}
	}

	public static async update(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		try {
			const { id } = req.params;
			const { asistentes } = req.body;

			const existeEvento = await Database.em.findOneBy(Evento, { id });

			if (!existeEvento) {
				res.status(404).json({
					msg: `Evento con id ${id} no existe`
				}).send();
			}

			const asistentesExistentes = await Database.em.findBy(Asistente, { evento: { id } });
			const asistentesNoEnviados = asistentesExistentes.filter(
				(asistenteExistente: Asistente) => {
					return (asistenteExistente.id !== null && !asistentes.some((recurso: Asistente) =>recurso.id === asistenteExistente.id));
				}
			);
			await Database.em.remove(asistentesNoEnviados);

			// for (const asistenteData of asistentes) {
			// 	const existeAsistente = Database.em.findOneBy(Asistente, {
			// 		id: asistenteData.id,
			// 	});
			// 	const existeParticipante = await Database.em.findOneBy(
			// 		Participante,
			// 		{ id: asistenteData.participante }
			// 	);
			// 	const existeRol = await Database.em.findOneBy(Rol, {
			// 		id: asistenteData.rol,
			// 	});

			// 	if (
			// 		existeAsistente != null &&
			// 		existeParticipante != null &&
			// 		existeRol != null
			// 	) {
			// 	}
			// }

			res.json({
				asistentesNoEnviados
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
}