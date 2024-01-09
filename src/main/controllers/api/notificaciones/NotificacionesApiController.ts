import { NextFunction, Request, Response } from "express";
import { Notificacion } from "../../../models/entities/asistencia/Notificacion";
import { Usuario } from "../../../models/entities/persona/Usuario";
import { Database } from "../../../server/Database";
import { getAuthUser } from "../../helpers/GetAuthUser";

export class NotificacionesApiController {
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await getAuthUser(req);

            if (!usuario) {
                res.status(401).json({ error: "Usuario no autenticado" });
                return;
            }

            const notificaciones = await Database.em.find(Notificacion, {
                where: { usuario: { id: usuario.id } }, // Ajusta según la estructura de tu modelo Usuario
            });

            res.json(notificaciones);
        } catch (e) {
            next(e);
        }
    }


}
