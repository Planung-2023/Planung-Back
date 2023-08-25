import { NextFunction, Request, Response } from "express";
import { Asistencia } from "../../../models/entities/asistencia/Asistencia";
import { Asistente } from "../../../models/entities/asistencia/Asistente";
import { Database } from "../../../server/Database";
import { AsistenciaApiController } from '../asistencias/AsistenciaApiController';

export class AsistentesApiController {
	public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const { asistentes } = req.body;

            for (const asistenteData of asistentes) {
                const asistenciaData = asistenteData.asistencia;
                const asistencia = new Asistencia();
                
                AsistenciaApiController.asignarParametros(asistencia, asistenciaData);
                await Database.em.save(asistencia);
                
                const asistente = new Asistente();
                AsistentesApiController.asignarParametros(asistente, asistenteData);
                asistente.asistencia = asistencia;
                await Database.em.save(asistente);
            }

            res.status(200);
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