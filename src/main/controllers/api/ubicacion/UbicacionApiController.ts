import { NextFunction, Request, Response } from "express";
import { Ubicacion } from "../../../models/entities/otros/Ubicacion";
import { Database } from "../../../server/Database";

export class UbicacionApiController {

    public static async index(req: Request, res: Response, next: NextFunction) {
        try {
            const ubicaciones = await Database.em.find(Ubicacion);
            res.json(ubicaciones);
        }
        catch (e) {
            next(e);
        }
    }

    public static async show(req: Request, res: Response, next: NextFunction) {
        try {
            const ubicacion = await Database.em.findOneBy(Ubicacion, {
                id: req.params.id
            });

            if(ubicacion === null) {
                res.status(404);
                res.send();
                return;
            }
            res.json(ubicacion);
        }
        catch (e) {
            next(e);
        }
    }

    public static async store(req: Request, res: Response, next: NextFunction) {
        try {
            const ubicacion = new Ubicacion();

            UbicacionApiController.asignarParametros(ubicacion!!, req.body);

            await Database.em.save(ubicacion);

            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const ubicacion = await Database.em.findOneBy(Ubicacion, {
                id: req.params.id
            });

            if(ubicacion === null) {
                res.status(404);
                res.send();
                return;
            }

            UbicacionApiController.asignarParametros(ubicacion!!, req.body);

            await Database.em.save(ubicacion);

            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }

    public static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const ubicacion = await Database.em.findOneBy(Ubicacion, {
                id: req.params.id
            });

            if(ubicacion === null) {
                res.status(404);
                res.send();
                return;
            }

            await Database.em.remove(ubicacion);
            res.status(200);
            res.send();
        }
        catch (e) {
            next(e);
        }
    }

    public static asignarParametros(ubicacion: Ubicacion, params: any) {
        ubicacion.setCalle(params.calle);
        ubicacion.setAltura(params.altura);
        ubicacion.setLocalidad(params.localidad);
        ubicacion.setLatitud(params.latitud);
        ubicacion.setLongitud(params.longitud);
        ubicacion.setLongitud(params.longitud);
    }
}