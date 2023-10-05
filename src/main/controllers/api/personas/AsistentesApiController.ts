import { NextFunction, Request, Response } from "express";
import { Asistente } from "../../../models/entities/asistencia/Asistente";
import { Evento } from "../../../models/entities/evento/Evento";
import { Participante } from "../../../models/entities/persona/Participante";
import { Rol } from "../../../models/entities/roles/Rol";
import { Database } from "../../../server/Database";
export class AsistentesApiController {
    // private static asistenteRepository: Repository<Asistente>

    constructor() {
        // AsistentesApiController.asistenteRepository = Database.em.getRepository(Asistente)
    }

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
            const asistentesRepository = Database.em.getRepository(Asistente)
			const { id } = req.params;
			const { asistentes } = req.body;

			const existeEvento = Database.em.findOneBy(Evento, { id });

			if (!existeEvento) {
				res.status(404);
			}

            const asistentesDB = await asistentesRepository
                .createQueryBuilder("asistente")
                .select(["asistente.id", "participante.id", "rol.id"])
                .where("asistente.activo = true")
                .leftJoin("asistente.participante", "participante")
                .leftJoin("asistente.rol", "rol")
                .getMany();

			for (const asistenteData of asistentes) {
				const existeAsistente = Database.em.findOneBy(Asistente, {
					id: asistenteData.id,
				});
				const existeParticipante = await Database.em.findOneBy(
					Participante,
					{ id: asistenteData.participante }
				);
				const existeRol = await Database.em.findOneBy(Rol, {
					id: asistenteData.rol,
				});

				if (
					existeAsistente != null &&
					existeParticipante != null &&
					existeRol != null
				) {
				}
			}

			res.status(200);
			res.json({
				asistentes: asistentesDB,
			});
			res.send();
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