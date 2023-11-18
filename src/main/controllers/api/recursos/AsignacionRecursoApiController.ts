import { NextFunction, Request, Response } from "express";
import { Asistente } from "../../../models/entities/asistencia/Asistente";
import { AsignacionRecurso } from "../../../models/entities/recursos/AsignacionRecurso";
import { Recurso } from "../../../models/entities/recursos/Recurso";
import { Database } from "../../../server/Database";
import { getAuthUser } from "../../helpers/GetAuthUser";
import { AsistentesApiController } from "../personas/AsistentesApiController";

export class AsignacionRecursoApiController {
    public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const { recursoId, asistenteId } = req.body;
            const usuario = await getAuthUser(req);
            const asistente = await Database.em.findOneBy(Asistente, { id: asistenteId });
            const recurso = await Database.em.findOneBy(Recurso, { id: recursoId });

            if (!asistente || !recurso) return res.status(404).send();

            const evento = await asistente.evento;
            const asistenteAdministrador = await AsistentesApiController.getAsistenteAdministrador(
                usuario,
                await evento.id,
            );
            if (!asistenteAdministrador)
                return res.status(401).json({ msg: "Unauthorized" }).send();

            const asignacionRecurso = new AsignacionRecurso();
            AsignacionRecursoApiController.asignarParametros(asignacionRecurso, req.body);

            await Database.em.save(asignacionRecurso);
            return res.json({ asignacionRecurso }).send();
        } catch (error) {
            next(error);
        }
    }

    private static async asignarParametros(asignacionRecurso: AsignacionRecurso, params: any) {
        asignacionRecurso.setCantidad(params.cantidad);
        asignacionRecurso.setComentarios(params.comentarios);
        asignacionRecurso.setRecurso(params.recursoId);
        asignacionRecurso.setAsistente(params.asistenteId);
    }
}
