import { Router } from "express";
import { RecursosApiController } from "../../controllers/api/recursos/RecursosApiController";

export class RecursosRoutes {

    public static router: Router;

    static {
        this.router = Router();

        this.router.get("/:id/asignaciones", RecursosApiController.getAsignaciones)
        this.router.get("/:id/categorias", RecursosApiController.getCategorias)
    }

}
