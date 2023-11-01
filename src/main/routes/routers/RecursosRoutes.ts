import { Router } from "express";
import { check } from "express-validator";
import { RecursosApiController } from "../../controllers/api/recursos/RecursosApiController";

export class RecursosRoutes {

    public static router: Router;

    static {
        this.router = Router();

        this.router.get("/:id/asignaciones", RecursosApiController.getAsignaciones);
        this.router.get("/:id/categorias", RecursosApiController.getCategorias);
        this.router.get("/categorias", RecursosApiController.getTodasLasCategorias);


        this.router.put("/:idRecurso", [
            check("recurso", "Recurso debe ser un objeto").notEmpty()
        ], RecursosApiController.updateOne)
    }

}
