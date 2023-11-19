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
            const recurso = await Database.em.findOneBy(Recurso, { id: recursoId });
            const asistente = await Database.em
                .getRepository(Asistente)
                .createQueryBuilder("asistente")
                .leftJoinAndSelect("asistente.evento", "evento")
                .where("asistente.id = :asistenteId", { asistenteId })
                .getOne();

            if (!asistente || !recurso) return res.status(404).send();

            const asistenteAdministrador = await AsistentesApiController.getAsistenteAdministrador(
                usuario,
                asistente.evento.id,
            );
            if (!asistenteAdministrador)
                return res.status(401).json({ msg: "No es administrador" }).send();

            const asignacionRecurso = new AsignacionRecurso();
            AsignacionRecursoApiController.asignarParametros(asignacionRecurso, req.body);

            await Database.em.save(asignacionRecurso);
            return res.json({ asignacionRecurso }).send();
        } catch (error) {
            next(error);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await getAuthUser(req);
            const { idAsignacion } = req.params;
            const asignacionRecurso = await Database.em.findOneBy(AsignacionRecurso, {
                id: idAsignacion,
            });

            if (!asignacionRecurso)
                return res.status(404).json({ msg: "AsignacionRecurso not found" }).send();

            const asistente = await Database.em
                .getRepository(Asistente)
                .createQueryBuilder("asistente")
                .leftJoinAndSelect("asistente.evento", "evento")
                .where("asistente.id = :asistenteId", {
                    asistenteId: asignacionRecurso.asistente.id,
                })
                .getOne();

            const asistenteAdministrador = await AsistentesApiController.getAsistenteAdministrador(
                usuario,
                asistente!.evento.id,
            );
            if (!asistenteAdministrador)
                return res.status(401).json({ msg: "No es administrador" }).send();

            AsignacionRecursoApiController.asignarParametros(asignacionRecurso, req.body);
            await Database.em.save(asignacionRecurso);

            return res.json({ asignacionRecurso }).send();
        } catch (error) {
            next(error);
        }
    }

    private static async asignarParametros(asignacionRecurso: AsignacionRecurso, params: any) {
        asignacionRecurso.setCantidad(
            params.cantidad ? params.cantidad : asignacionRecurso.getCantidad(),
        );
        asignacionRecurso.setComentarios(
            params.comentarios ? params.comentarios : asignacionRecurso.getComentarios(),
        );
        asignacionRecurso.setRecurso(params.recursoId);
        asignacionRecurso.setAsistente(params.asistenteId);
    }
}
