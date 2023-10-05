import { Router } from "express";
import { RecursosApiController } from "../../controllers/api/recursos/RecursosApiController";


export class PermisosRoutes{
    public static router:Router;

    static{
        this.router=Router();

        this.router.get("/",RecursosApiController.index);
        this.router.get("/:id",RecursosApiController.show);
        this.router.put("/:id",RecursosApiController.update);
        this.router.post("/",RecursosApiController.store);
        this.router.delete("/:id",RecursosApiController.remove);
        this.router.get("/:id",RecursosApiController.getCategorias);



    }

}