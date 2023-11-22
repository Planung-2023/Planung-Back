import { Router } from "express";
import { UsuariosApiController } from "../../controllers/api/personas/UsuariosApiController";
import { authValidation } from "../../middlewares/auth.middleware";

export class UsuariosRoutes {
    public static router: Router;

    static {
        this.router = Router();
        this.router.get("", authValidation, UsuariosApiController.index);
        this.router.get("/:id", authValidation, UsuariosApiController.show);
        this.router.put("/:id", authValidation, UsuariosApiController.update);
        this.router.post("", authValidation, UsuariosApiController.store);
        this.router.delete("/:id", authValidation, UsuariosApiController.remove);

        this.router.get("/token/usuario", authValidation, UsuariosApiController.getUsuarioByToken);
        this.router.get("/validar/usuario", authValidation, UsuariosApiController.validarUsuario);
    }
}
