import { Router } from "express";
import { check } from "express-validator";
import { EventosApiController } from "../../controllers/api/eventos/EventosApiController";
import { AsistentesApiController } from "../../controllers/api/personas/AsistentesApiController";
import { RecursosApiController } from "../../controllers/api/recursos/RecursosApiController";
import { authValidation } from "../../middlewares/auth.middleware";
import { validarCampos } from "../../middlewares/validar-campos";

export class EventosRoutes {
    public static router: Router;

    static {
        this.router = Router();
        this.router.get("/", authValidation, EventosApiController.index);
        this.router.get("/:id", EventosApiController.show);
        this.router.put("/", EventosApiController.update);
        this.router.post(
            "/",
            [check("evento", "Evento debe ser una propiedad").exists(), validarCampos],
            authValidation,
            EventosApiController.store,
        );
        this.router.delete("/:id", EventosApiController.remove);

        // Recursos
        this.router.get("/:id/recursos", RecursosApiController.index);

        this.router.get("/:id/recursos", RecursosApiController.show);

        this.router.put(
            "/:id/recursos",
            [check("recursos", "Recursos debe ser un array").notEmpty().isArray(), validarCampos],
            RecursosApiController.update,
        );

        this.router.post(
            "/:id/recursos",
            [check("recursos", "Recursos debe ser un array").notEmpty().isArray(), validarCampos],
            RecursosApiController.store,
        );

        this.router.delete("/:id/recursos", RecursosApiController.remove);

        // Asistentes
        this.router.get("/:id/asistentes", AsistentesApiController.index);

        this.router.post(
            "/:id/asistentes",
            [
                check("asistentes", "Asistentes debe ser un array").notEmpty().isArray(),
                validarCampos,
            ],
            AsistentesApiController.store,
        );

        this.router.put(
            "/:id/asistentes",
            [
                check("asistentes", "Asistentes debe ser un array").notEmpty().isArray(),
                validarCampos,
            ],
            AsistentesApiController.update,
        );

        this.router.post("/:idEvento/unirse", authValidation, AsistentesApiController.unirseEvento);
        this.router.post(
            "/:idEvento/aceptar-asistente",
            authValidation,
            AsistentesApiController.aceptarAsistente,
        );
        this.router.post(
            "/:idEvento/rechazar-asistente",
            authValidation,
            AsistentesApiController.rechazarAsistente,
        );
    }
}
