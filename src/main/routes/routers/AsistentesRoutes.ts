import { Router } from "express";
import { AsistentesApiController } from "../../controllers/api/personas/AsistentesApiController";
import { authValidation } from "../../middlewares/auth.middleware";

export class AsistentesRoutes {
    public static router: Router;
    static {
        this.router = Router();

        this.router.put("/:id/cambiar-aceptacion", AsistentesApiController.cambiarEstadoAceptacion);
        this.router.delete("/:id", authValidation, AsistentesApiController.removeAsistenteById);
    }
}
