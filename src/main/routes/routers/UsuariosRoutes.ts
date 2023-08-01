import { Router } from "express";
import { UsuariosApiController } from "../../controllers/api/personas/UsuariosApiController";

export class UsuariosRoutes {
    public static router: Router;

    static{

        this.router= Router()
        this.router.get("", UsuariosApiController.index);
        this.router.get("/:id", UsuariosApiController.show);
        this.router.put("/:id", UsuariosApiController.update);
        this.router.post("", UsuariosApiController.store);
        this.router.delete("/:id", UsuariosApiController.remove);
    }
}