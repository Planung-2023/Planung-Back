import { NextFunction, Request, Response } from "express";
import { CategoriaRecurso } from "../../../models/entities/recursos/CategoriaRecurso";
import { Database } from "../../../server/Database";

export class CategoriaRecursosApiController{
    public static async index(req:Request, res:Response,next:NextFunction){
        try {
            const idEvento = req.params.id;

            const categoriasRecurso = await Database.em.find(CategoriaRecurso);

            res.json(categoriasRecurso);
        }
        catch (e) {
            next(e);
        }
    }

    public static async findOneById(id: string) {
        const categoriaRecurso = await Database.em.findOneBy(CategoriaRecurso, { id });

        return categoriaRecurso;
    }
}