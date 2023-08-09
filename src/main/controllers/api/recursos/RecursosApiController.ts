import { NextFunction, Request, Response } from "express";
import { Recurso } from "../../../models/entities/recursos/Recurso";
import { Database } from "../../../server/Database";

export class RecursosApiController {

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const idEvento = req.params.id;

            const recursos = await Database.em.find(Recurso, { where: {
                evento: {
                    id: idEvento
                }
            }});
            res.json(recursos);
        }
        catch (e) {
            next(e);
        }
    }
    public static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const recurso = await Database.em.findOneBy(Recurso, {
                id: req.params.id
            });

            if(recurso === null) {
                res.status(404);
                res.send();
                return;
            }
            res.json(recurso);
        }
        catch (e) {
            next(e);
        }
    }
    public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const recurso = new Recurso();

            RecursosApiController.asignarParametros(recurso!!, req.body);

            await Database.em.save(recurso);

            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }
    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const recurso = await Database.em.findOneBy(Recurso, {
                id: req.params.id
            });

            if(recurso === null) {
                res.status(404);
                res.send();
                return;
            }

            RecursosApiController.asignarParametros(recurso!!, req.body);

            await Database.em.save(recurso);

            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }
    public static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const recurso = await Database.em.findOneBy(Recurso, {
                id: req.params.id
            });

            if(recurso === null) {
                res.status(404);
                res.send();
                return;
            }

            await Database.em.remove(recurso);
            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }
    private static asignarParametros(recurso: Recurso, params: any) {
        recurso.setNombre(params.nombre);
        recurso.setEvento(params.evento);
        recurso.setDescripcion(params.descripcion);
        recurso.setCantidad(params.cantidad);
        recurso.setCategoria(params.categoria);
        recurso.setProveedor(params.proveedor);
    }
}