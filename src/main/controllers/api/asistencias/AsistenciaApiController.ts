import { NextFunction, Request, Response } from "express";
import { Asistencia } from "../../../models/entities/asistencia/Asistencia";

export class AsistenciaApiController {

    // TODO: rechazar y aceptar invitacion
    
	public static async store(req: Request, res: Response, next: NextFunction) {
		try {
			res.status(200);
			res.send();
		} catch (e) {
			next(e);
		}
    }
    static asignarParametros(asistencia: Asistencia, params: any) {
        console.log("valores: ", params)
        asistencia.setFechaHora(params.fechaHora);
	}
}