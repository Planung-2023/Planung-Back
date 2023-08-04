import { Router } from "express";
import { PermisoApiController } from "../../controllers/api/roles/PremisoApiController";

export class PermisosRoutes{
    public static router:Router;

    static{
        this.router=Router();

        this.router.get("/",PermisoApiController.index);
    }

}