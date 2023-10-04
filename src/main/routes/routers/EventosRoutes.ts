import { Router } from "express";
import { check } from "express-validator";
import { EventosApiController } from "../../controllers/api/eventos/EventosApiController";
import { AsistentesApiController } from "../../controllers/api/personas/AsistentesApiController";
import { RecursosApiController } from "../../controllers/api/recursos/RecursosApiController";
import { validarCampos } from "../../middlewares/validar-campos";

export class EventosRoutes {
    public static router: Router;

    static {
        this.router = Router();
        this.router.get("/", EventosApiController.index);
        this.router.get("/:id", EventosApiController.show);
        this.router.put("/:id", EventosApiController.update);
        this.router.post("/", EventosApiController.store);
        this.router.delete("/:id", EventosApiController.remove);

        // Recursos
        this.router.get("/:id/recursos", RecursosApiController.index);
        
        this.router.get("/:id/recursos", RecursosApiController.show);
        
        this.router.put("/:id/recursos", [
            check("recursos", "Recursos debe ser un array").notEmpty().isArray(),
            validarCampos
        ], RecursosApiController.update);

        this.router.post("/:id/recursos", [
            check("recursos", "Recursos debe ser un array").notEmpty().isArray(),
            validarCampos
        ], RecursosApiController.store);
        
        this.router.delete("/:id/recursos", RecursosApiController.remove);

        // Asistentes
        this.router.post("/:id/asistentes", AsistentesApiController.store);
        this.router.put("/:id/asistentes", AsistentesApiController.update)
    }
}