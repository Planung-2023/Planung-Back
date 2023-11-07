import { NextFunction, Request, Response } from "express";
import { Participante } from "../../../models/entities/persona/Participante";
import { Usuario } from "../../../models/entities/persona/Usuario";
import { Database } from "../../../server/Database";
import { ParticipantesApiController } from "./ParticipantesApiController";

export class UsuariosApiController {
    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const usuarios = await Database.em.find(Usuario, {
                select: ["id", "nombreUsuario"],
            });
            res.json(usuarios);
        } catch (e) {
            next(e);
        }
    }

    public static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const usuarioDb = await Database.em.findOneBy(Usuario, {
                id,
            });

            if (usuarioDb === null) {
                res.status(404)
                    .json({ msg: `User con id ${id} no encontrado` })
                    .send();
                return;
            }

            const { contrasenia, ...usuario } = usuarioDb;

            res.json(usuario).send();
            return;
        } catch (e) {
            next(e);
        }
    }

    public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = new Usuario();
            const { body } = req;

            const userParams = { nombreUsuario: body.nombreUsuario };
            UsuariosApiController.asignarParametros(usuario, userParams);

            await Database.em.save(usuario);

            const participanteDb = new Participante();
            const participanteParams = {
                nombre: body.nombre,
                apellido: body.apellido,
                mail: body.mail,
                usuario,
            };
            ParticipantesApiController.asignarParametros(participanteDb, participanteParams);

            await Database.em.save(participanteDb);

            res.status(200).send({ participante: participanteDb });
        } catch (e) {
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await Database.em.findOneBy(Usuario, {
                id: req.params.id,
            });

            if (!usuario) return res.json({ msg: "Not found" }).status(404).send();

            UsuariosApiController.asignarParametros(usuario!!, req.body);

            await Database.em.save(usuario);

            res.json({ usuario }).status(200).send();
        } catch (e) {
            next(e);
        }
    }

    public static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const usuario = await Database.em.findOneBy(Usuario, {
                id: req.params.id,
            });

            if (usuario === null) {
                res.status(404);
                res.send();
                return;
            }

            await Database.em.remove(usuario);
            res.status(200);
            res.send();
        } catch (e) {
            next(e);
        }
    }
    private static asignarParametros(usuario: Usuario, params: any) {
        usuario.setNombreUsuario(params.nombreUsuario);
        usuario.setContrasenia(params.contrasenia);
        usuario.setFotoPerfil(params.fotoPerfil);
    }
}
