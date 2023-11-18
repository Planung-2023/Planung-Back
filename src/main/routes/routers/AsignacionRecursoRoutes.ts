import { Router } from "express";
import { check } from "express-validator";
import { AsignacionRecursoApiController } from "../../controllers/api/recursos/AsignacionRecursoApiController";
import { authValidation } from "../../middlewares/auth.middleware";
import { validarCampos } from "../../middlewares/validar-campos";

export class AsignacionRecursoRoutes {
    public static router: Router;

    static {
        this.router = Router();

        this.router.post(
            "/",
            [
                authValidation,
                check("cantidad", "Cantidad debe ser minimo 1").isFloat({ min: 1 }),
                check("comentarios", "Comentarios debe ser un campo").isString(),
                check("recursoId", "recursoId debe ser un numero").isNumeric(),
                check("asistenteId", "asistenteId debe ser un numero").isNumeric(),
                validarCampos,
            ],
            AsignacionRecursoApiController.store,
        );

        this.router.put("/:idAsignacion", [authValidation], AsignacionRecursoApiController.update);
    }
}
