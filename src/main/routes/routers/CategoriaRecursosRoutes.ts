import { Router } from "express";
import { CategoriaRecursosApiController } from "../../controllers/api/recursos/CategoriaRecursosApiController";


export class PermisosRoutes{
    public static router:Router;

    static{
        this.router=Router();

        this.router.get("/",CategoriaRecursosApiController.index);
    }
}    